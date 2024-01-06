import React, { useState, useEffect } from "react";
import Spinner from "../components/Spinner";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import BookTable from "../components/home/BookTable";
import BookCard from "../components/home/BookCard";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showTable, setShowTable] = useState("table");

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      const { data } = await axios
        .get("http://localhost:5555/api/books")
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
      setBooks(data.data);
      setLoading(false);
    };
    fetchBooks();
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-center items-center gap-4">
        <button
          onClick={() => setShowTable("table")}
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
        >
          Table
        </button>
        <button
          onClick={() => setShowTable("card")}
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
        >
          Card
        </button>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Books List</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : showTable === "table" ? (
        <BookTable books={books} />
      ) : (
        <BookCard books={books} />
      )}
    </div>
  );
};

export default Home;
