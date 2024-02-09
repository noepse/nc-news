import ArticleCard from "./ArticleCard.jsx";
import Sorter from "./Sorter.jsx";
import Error from "./Error.jsx";
import { useEffect, useState } from "react";
import { getArticles } from "../utils/api.js";
import { useParams, useSearchParams } from "react-router-dom";

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

  const [error, setError] = useState(false)

  useEffect(() => {
    setIsLoadingArticles(true);

    getArticles(topic_name, { sort_by: sortByQuery, order: orderQuery })
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
        <main id="articles">
          {articles.map((article) => {
            return (
              <ArticleCard
                key={article.article_id}
                article={article}
                setCurrentArticle={setCurrentArticle}
              />
            );
          })}
        </main>
      )}
    </>
  );
}
