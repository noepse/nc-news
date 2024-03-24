import ArticleCard from "./ArticleCard.jsx";
import Sorter from "./Sorter.jsx";
import Error from "./Error.jsx";
import { useEffect, useState } from "react";
import { getArticles } from "../utils/api.js";
import { useParams, useSearchParams } from "react-router-dom";

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function Articles(props) {
  const {
    setCurrentArticle,
    articles,
    setArticles,
    isLoadingArticles,
    setIsLoadingArticles,
  } = props;

  const { topic_name } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const sortByQuery = searchParams.get("sort_by");
  const orderQuery = searchParams.get("order"); 
  const pageQuery = searchParams.get("p"); 

  const [error, setError] = useState(false)

  useEffect(() => {
    setIsLoadingArticles(true);

    getArticles(topic_name, { sort_by: sortByQuery, order: orderQuery, p: pageQuery })
    .then(
      (articlesData) => {
        setIsLoadingArticles(false);
        setError(false)

        if (sortByQuery === "comment_count" || sortByQuery === "votes") {
          setArticles(
            articlesData.sort((a, b) => {
              let sorter = 1;

              if (orderQuery === "asc") {
                sorter = -1;
              }
              if (a[sortByQuery] < b[sortByQuery]) {
                return sorter;
              } else return -sorter;
            })
          );
        } else {
          setArticles(articlesData);
        }
      }
    ).catch((error)=>{
        setIsLoadingArticles(false)
        setError(error)
    })
  }, [topic_name, searchParams]);

  function handleChange(event){
setSearchParams({ p: event.target.innerText });
  }

  return (
    <>
      <div className="sortHeader">
        <h2>{topic_name || "recently added"}</h2>
        {topic_name ? (
          <Sorter
            topic_name={topic_name}
            setArticles={setArticles}
            articles={articles}
            setSearchParams={setSearchParams}
          />
        ) : null}
      </div>
      {error || isLoadingArticles ? (
        error ? <Error error={error}/> : <p>Loading articles...</p>
    ) : (
        <><main id="articles">
            {articles.map((article) => {
              return (
                <ArticleCard
                  key={article.article_id}
                  article={article}
                  setCurrentArticle={setCurrentArticle} />
              );
            })}
          </main>
          <Stack spacing={1}>
              <Pagination count={2} color="secondary" page={pageQuery ? Number(pageQuery) : 1} onChange={handleChange} />
            </Stack></>
      )}
    </>
  );
}
