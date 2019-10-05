const { database, firestore } = require("../../firebase/admin");

export default (req, res) => {
  const { project, amount, id } = req.query;

  if (id && project) {
    database
      .collection("projects")
      .doc(project)
      .update({
        donations: firestore.FieldValue.arrayUnion({
          id,
          amount: Number(amount),
          timestamp: +new Date(),
        }),
      })
      .then(donation => res.status(200).json(donation))
      .catch(error => res.status(400).json(error));
  } else {
    res.status(304).end();
  }
};