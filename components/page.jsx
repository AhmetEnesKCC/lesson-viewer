import React from "react";
import RMD from "react-markdown";

const Page = ({ children, frontmatter }) => {
  return (
    <div className="page">
      <div className="p-2 text-white pl-0 mb-8">
        <span
          className="mr-2 opacity-40"
          style={{ color: "var(--text-color)" }}
        >
          {frontmatter.author}
        </span>{" "}
        <span
          className="mr-2 opacity-60 font-bold"
          style={{ color: "var(--text-color)" }}
        >
          {frontmatter["student-number"]}
        </span>{" "}
      </div>
      <div className="title">{frontmatter.title}</div>

      <RMD
        components={{
          hr: ({ node, props }) => (
            <div className="hr" {...props}>
              <div>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          ),
          a: ({ node, props }) => {
            return (
              <a
                href={node.properties.href}
                target="_blank"
                className="cursor-pointer"
              >
                {node.children[0].value}
              </a>
            );
          },
        }}
      >
        {children}
      </RMD>
    </div>
  );
};

export default Page;
