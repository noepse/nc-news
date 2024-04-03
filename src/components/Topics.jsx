import { useState, useEffect } from "react";
import { getTopics } from "../utils/api";
import TopicCard from "./TopicCard";

import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import * as React from "react";

export default function Topics(props) {

  const {onClick} = props

  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getTopics().then((topicsData) => {
      setIsLoading(false);
      setTopics(topicsData);
    });
  }, []);

  return (
    <>
      <section id="topics" onClick={onClick}>
        {isLoading ? (
          <p>Loading topics...</p>
        ) : (
          <>
          <h2>topics</h2>
            {topics.map((topic) => {
              return <TopicCard key={topic.slug} topic={topic} />;
            })}
              <Link to={`/articles/all`}>view all</Link>
          </>
        )}
      </section>
    </>
  );
}
