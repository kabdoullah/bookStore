import React, { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const CreateBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSave = async () => {
    const data = {
      title,
      author,
      publishYear,
    };

    try {
      setLoading(true);
      await axios.post("http://localhost:5555/api/books", data);
      setLoading(false);
      enqueueSnackbar("Book created successfully", { variant: "success" });
      navigate("/");
    } catch (error) {
      console.log(error);
      setLoading(false);
      enqueueSnackbar("Error creating book", { variant: "error" });
    }
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Create Book</h1>
      {loading && <Spinner />}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
        <div className="my-4">
          <label className="text-xl m-4 text-gray-500">Title</label>
          <input
            type="text"
            className="border border-gray-500 px-4 py-2 w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="my-4">
          <label className="text-xl m-4 text-gray-500">Author</label>
          <input
            type="text"
            className="border border-gray-500 px-4 py-2 w-full"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div className="my-4">
          <label className="text-xl m-4 text-gray-500">Publish Year</label>
          <input
            type="number"
            className="border border-gray-500 px-4 py-2 w-full"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
          />
        </div>
        <button className="p-2 bg-sky-300 m-8" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export default CreateBook;
