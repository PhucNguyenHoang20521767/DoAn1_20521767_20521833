import React from "react";
import Search from "./Search";
import BlogList from "./BlogList";

const Title = () => {
  const [search, setSearch] = React.useState("");

  function onSearchChange(value: any) {
    setSearch(value);
  }

  return (
    <div className="ml-4 flex flex-col">
      <section>
        <div className="gap-4 md:flex md:items-center md:justify-between">
          <h1 className="text-center text-3xl font-semibold text-gray-700">
            Tin tức
          </h1>
          <div className="block">
            <Search onSearchChange={onSearchChange}></Search>
          </div>
        </div>
      </section>
      <section>
        <BlogList search={search}></BlogList>
      </section>
    </div>
  );
};

export default Title;
