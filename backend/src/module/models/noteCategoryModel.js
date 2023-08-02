module.exports = (sequelize, DataTypes) => {
  const NoteCategory = sequelize.define("note_category", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true
    },
    noteId: {
      type: DataTypes.INTEGER,
      primaryKey: false,
      allowNull: false,
      references: {
        model: "notes",
        key: "id"
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    },
    categoryId: {
      type: DataTypes.INTEGER,
      primaryKey: false,
      allowNull: false,
      references: {
        model: "categories",
        key: "id"
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    }
  }, {
    tableName: 'note_categories'
  });

  return NoteCategory;
};