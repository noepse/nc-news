import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { getArticles } from "../utils/api";

export default function NavBar() {

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  function goToRandomArticle() {
    setIsLoading(true);
    return getArticles().then((articlesData) => {
      setIsLoading(false);
      const max = articlesData.length;
      const randomIndex = Math.floor(Math.random() * max);
      const randomArticleId = articlesData[randomIndex].article_id;
      navigate(`/${randomArticleId}`);
    });
  }

  return (
    <Stack spacing={2} direction="row" id="navbar">
      <Button variant="text" color="purple">
        <Link to="/">home</Link>
      </Button>
      <Button variant="outlined" color="primary">
        <Link to="/submit">post</Link>
      </Button>
      <Button
        variant="text"
        color="purple"
        disabled={isLoading}
        onClick={goToRandomArticle}
      >
        random
      </Button>
    </Stack>
  );
}
