import React from "react";
import RMD from "react-markdown";

const Page = ({ children, frontmatter }) => {
  return (
    <div className="page">
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
        }}
      >
        {children}
      </RMD>
    </div>
  );
};

export default Page;
