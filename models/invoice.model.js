module.exports = (sequelize, Sequelize) => {
  const Invoice = sequelize.define("invoice", {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    full_name: {
      type: Sequelize.STRING,
    },
    phone_number: {
      type: Sequelize.STRING,
    },
    address: {
      type: Sequelize.TEXT,
    },
    email: {
      type: Sequelize.STRING,
      validate: {
        isEmail: true,
      },
    },
    pincode: {
      type: Sequelize.STRING,
    },
    items: {
      type: Sequelize.TEXT,
      get() {
        const rawValue = this.getDataValue("items");
        return JSON.parse(rawValue);
      },
      set(value) {
        this.setDataValue("items", JSON.stringify(value));
      },
    },
    tax: {
      type: Sequelize.FLOAT,
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },
    discount: {
      type: Sequelize.FLOAT,
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },
  });

  return Invoice;
};
