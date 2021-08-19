import { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { Header, Sidebar, Content } from "./components";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
  },
  contentPane: {
    flexGrow: 1,
    display: "flex",
  },
});

const App = () => {
  const classes = useStyles();
  const [invoices, setInvoices] = useState([]);
  const [selectedId, setSelectedId] = useState(0);

  useEffect(() => {
    axios.get("/api/invoices/").then((res) => {
      setInvoices(res.data);
    });
  }, []);

  useEffect(() => {
    if (invoices.length > 0) {
      setSelectedId(invoices[0].id);
    }
  }, [invoices]);

  const handleSelectInvoice = (id) => {
    setSelectedId(id);
  };

  const handleSave = (newInvoice) => {
    axios.post("/api/invoices/", newInvoice).then((res) => {
      setInvoices([res.data, ...invoices]);
    });
  };

  return (
    <Box className={classes.root}>
      <Header />
      <Box className={classes.contentPane}>
        <Sidebar
          invoices={invoices}
          handleSelectInvoice={handleSelectInvoice}
          selectedId={selectedId}
        />
        <Content
          invoice={invoices.find((invoice) => invoice.id === selectedId)}
          handleSave={handleSave}
        />
      </Box>
    </Box>
  );
};

export default App;
