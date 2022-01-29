import React, { useState } from "react";
import { BsFileText, BsFillImageFill } from "react-icons/bs";
import Image from "../components/image";
import Text from "../components/text";
import { v4 as uuid } from "uuid";
import HR from "../components/hr";
import { saveAs } from "file-saver";
import matter, { read } from "gray-matter";

const Write = () => {
  const [writes, setWrites] = useState([]);
  const [frontMatter, setFrontMatter] = useState({
    title: "",
    isim: "",
    numara1: "",
    numara2: "",
    ogrenci_numarasi: "",
  });

  const handleFileLoad = (e) => {
    const data = e.target.result;
    const frontMatter = matter(e.target.result);
    console.log(frontMatter);
    const numbers = frontMatter.data.title.match(/\d-\d/);

    const frontMatterObject = {};
    frontMatterObject.title = frontMatter.data.title.slice(
      numbers.index + numbers[0].length
    );

    numbers = numbers[0].split("-");
    frontMatterObject.numara1 = parseInt(numbers[0]);
    frontMatterObject.numara2 = parseInt(numbers[1]);
    frontMatterObject.ogrenci_numarasi = frontMatter.data["student-number"];
    frontMatterObject.isim = frontMatter.data.author;
    setFrontMatter(frontMatterObject);

    const contents = frontMatter.content.split("\n");
    const newWrites = [];
    contents.forEach((content) => {
      if (content.match(/^(###)/)) {
        const writeObject = {};
        writeObject.type = "h3";
        writeObject.id = uuid();
        writeObject.value = content.slice(3);
        newWrites.push(writeObject);
      } else if (content.match(/^(##)/)) {
        const writeObject = {};
        writeObject.type = "h2";
        writeObject.id = uuid();
        writeObject.value = content.slice(2);
        newWrites.push(writeObject);
      } else if (content.match(/^(#)/)) {
        const writeObject = {};
        writeObject.type = "h1";
        writeObject.id = uuid();
        writeObject.value = content.slice(1);
        newWrites.push(writeObject);
      } else if (content.match(/^(!\[\])/)) {
        const writeObject = {};
        writeObject.type = "image";
        writeObject.id = uuid();
        writeObject.value = content.trim().slice(4).slice(0, -1);
        newWrites.push(writeObject);
      } else if (content.match(/^(---)/)) {
        const writeObject = {};
        writeObject.type = "hr";
        writeObject.id = uuid();
        writeObject.value = content.trim();
        newWrites.push(writeObject);
      } else if (content.trim()) {
        const writeObject = {};
        writeObject.type = "yazi";
        writeObject.id = uuid();
        writeObject.value = content.trim();
        newWrites.push(writeObject);
      }
    });
    setWrites(newWrites);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const text = `---\ntitle: ${frontMatter.numara1}-${frontMatter.numara2} ${frontMatter.title}\nauthor: ${frontMatter.isim}\nstudent-number: ${frontMatter.ogrenci_numarasi}\n---`;
    const sources = [];
    writes.forEach((write) => {
      const element = document.getElementById(write.id);
      if (write.type === "image") {
        const source = element.querySelector("img").getAttribute("src");
        text += `\n![](${source})\n`;
        sources.push(source);
      } else if (write.type === "yazi") {
        text +=
          "\n" +
          element.querySelector(`.${write.type}`).value.replace("\n", " ") +
          "\n";
      } else if (write.type === "h1") {
        text +=
          "\n# " +
          element.querySelector(`.${write.type}`).value.replace("\n", " ") +
          "\n";
      } else if (write.type === "h2") {
        text +=
          "\n## " +
          element.querySelector(`.${write.type}`).value.replace("\n", " ") +
          "\n";
      } else if (write.type === "h3") {
        text +=
          "\n### " +
          element.querySelector(`.${write.type}`).value.replace("\n", " ") +
          "\n";
      } else if (write.type === "hr") {
        text += "\n---\n";
      }
    });

    var blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "odev.md");
  };

  return (
    <form className="write" action="get" id="file-form" onSubmit={handleSubmit}>
      <button
        type="submit"
        className="mb-10 text-white w-full bg-orange-500 bg-opacity-40 text-center py-2 mt-2"
      >
        Dosya Yukle
        <input
          type="file"
          accept=".txt, .md"
          onChange={(e) => {
            if (e.target.files[0]) {
              const reader = new FileReader();
              reader.onload = handleFileLoad;
              reader.readAsText(e.target.files[0]);
            }
          }}
        />
      </button>
      <div
        className="w-full text-center mb-5 text-xl"
        style={{ color: "var(--text-color)" }}
      >
        Başlık
      </div>
      <input
        type="text"
        value={frontMatter.title}
        onChange={(e) => {
          setFrontMatter({ ...frontMatter, title: e.target.value });
        }}
        placeholder="Başlık"
        className="mb-10"
      />
      <div
        className="w-full text-center mb-5 text-xl"
        style={{ color: "var(--text-color)" }}
      >
        Numara
      </div>
      <div className="flex justify-start items-center w-max mx-auto">
        <input
          onChange={(e) => {
            setFrontMatter({ ...frontMatter, numara1: e.target.value });
          }}
          value={frontMatter.numara1}
          type="number"
          min={1}
          max={20}
        />{" "}
        <span
          className=" mx-10 text-3xl"
          style={{ color: "var(--text-color)" }}
        >
          -
        </span>
        <input
          onChange={(e) => {
            setFrontMatter({ ...frontMatter, numara2: e.target.value });
          }}
          value={frontMatter.numara2}
          type="number"
          min={1}
          max={20}
        />
      </div>
      <div
        style={{ color: "var(--text-color)" }}
        className="w-full  text-center  text-xl mt-10 mb-5"
      >
        İsim
      </div>

      <input
        onChange={(e) => {
          setFrontMatter({ ...frontMatter, isim: e.target.value });
        }}
        type="text"
        value={frontMatter.isim}
        placeholder="İsim"
        className="mb-10"
      />
      <div
        className="w-full  text-center  text-xl mt-10 mb-5"
        style={{ color: "var(--text-color)" }}
      >
        Öğrenci Numarası
      </div>
      <input
        onChange={(e) => {
          setFrontMatter({ ...frontMatter, ogrenci_numarasi: e.target.value });
        }}
        value={frontMatter.ogrenci_numarasi}
        placeholder="Ogrenci Numarasi"
        className="mb-10"
        type="text"
      />

      {writes &&
        writes.map((w) => {
          return w.type === "image" ? (
            <Image
              alt=""
              key={w.id}
              id={w.id}
              defaultValue={w.value}
              ondelete={() => {
                const oldWrites = writes;
                const newWrites = oldWrites.filter((wr) => wr.id !== w.id);
                setWrites(newWrites);
              }}
            />
          ) : ["yazi", "h1", "h2", "h3"].includes(w.type) ? (
            <Text
              key={w.id}
              id={w.id}
              type={w.type}
              defaultValue={w.value}
              ondelete={() => {
                const oldWrites = writes;
                const newWrites = oldWrites.filter((wr) => wr.id !== w.id);
                setWrites(newWrites);
              }}
            />
          ) : (
            <HR
              key={w.id}
              id={w.id}
              type={w.type}
              ondelete={() => {
                const oldWrites = writes;
                const newWrites = oldWrites.filter((wr) => wr.id !== w.id);
                setWrites(newWrites);
              }}
            />
          );
        })}
      <div className="w-full border-main-white  border-2 border-b-0 border-opacity-20 text-main-white text-center py-2">
        Element Ekle
      </div>
      <div className="add relative">
        <div>
          <div
            onClick={() => {
              setWrites([...writes, { type: "h1", id: uuid(), value: "" }]);
            }}
          >
            H1
          </div>
          <div
            onClick={() => {
              setWrites([...writes, { type: "h2", id: uuid(), value: "" }]);
            }}
          >
            H2
          </div>
          <div
            onClick={() => {
              setWrites([...writes, { type: "h3", id: uuid(), value: "" }]);
            }}
          >
            H3
          </div>
          <div
            onClick={() => {
              setWrites([...writes, { type: "yazi", id: uuid(), url: "" }]);
            }}
          >
            Yazı
          </div>
        </div>
        <div>
          <div
            onClick={() => {
              setWrites([...writes, { type: "image", id: uuid() }]);
            }}
          >
            Resim <BsFillImageFill />
          </div>
          <div
            onClick={() => {
              setWrites([...writes, { type: "hr", id: uuid() }]);
            }}
          >
            Cizgi ---
          </div>
        </div>
      </div>
      <button
        id="save-file"
        type="submit"
        className="text-white w-full bg-blue-600 text-center py-2 mt-2"
      >
        Kaydet
      </button>
    </form>
  );
};

export default Write;
