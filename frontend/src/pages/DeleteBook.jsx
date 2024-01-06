import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
import { useSnackbar } from "notistack";

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = async () => {
    console.log(id);
    try {
      setLoading(true);
      await axios.delete(`http://localhost:5555/api/books/${id}`);
      setLoading(false);
      enqueueSnackbar("Book deleted successfully", { variant: "success" });
      navigate("/");
    } catch (error) {
      console.log(error);
      setLoading(false);
      enqueueSnackbar("Error deleting book", { variant: "error" });
    }
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Delete Book</h1>
      {loading && <Spinner />}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600PX] p-8 mx-auto items-center">
        <h3 className="text-xl m-4 text-gray-500">
          Are you sure you want to delete this book?
        </h3>
        <button
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-700 text-white m-8 w-full"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteBook;
