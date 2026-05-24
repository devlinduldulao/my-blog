import { describe, expect, it } from "vitest";
import { BLOG_PATH } from "@/content-constants";
import { getPath } from "@/utils/getPath";
import getSortedPosts from "@/utils/getSortedPosts";
import getUniqueTags from "@/utils/getUniqueTags";
import shorterDomain from "@/utils/shorterDomain";
import { slugifyAll, slugifyStr } from "@/utils/slugify";
import { cn } from "@/utils/style";

type BlogEntry = {
  id: string;
  filePath?: string;
  data: {
    draft?: boolean;
    pubDatetime: Date;
    modDatetime?: Date | null;
    tags: string[];
  };
};

const createPost = (overrides: Partial<BlogEntry> = {}): BlogEntry => ({
  id: "hello-world",
  filePath: `${BLOG_PATH}/hello-world.md`,
  data: {
    draft: false,
    pubDatetime: new Date("2023-01-01T00:00:00.000Z"),
    modDatetime: null,
    tags: ["JavaScript"],
    ...overrides.data,
  },
  ...overrides,
});

describe("slugify utilities", () => {
  it("slugifies a single string", () => {
    expect(slugifyStr("Hello TypeScript World")).toBe(
      "hello-type-script-world"
    );
  });

  it("slugifies an array of strings", () => {
    expect(slugifyAll(["Hello World", "C# Basics"])).toEqual([
      "hello-world",
      "c-basics",
    ]);
  });
});

describe("shorterDomain", () => {
  it("removes protocol and www prefix", () => {
    expect(shorterDomain("https://www.example.com/docs")).toBe(
      "example.com/docs"
    );
  });

  it("preserves the rest of the url", () => {
    expect(shorterDomain("http://sub.example.com/path?x=1")).toBe(
      "sub.example.com/path?x=1"
    );
  });
});

describe("cn", () => {
  it("merges tailwind classes with the last one winning", () => {
    expect(cn("p-2 text-sm", "p-4", false)).toBe("text-sm p-4");
  });
});

describe("getPath", () => {
  it("returns a root post path", () => {
    expect(getPath("hello-world", `${BLOG_PATH}/hello-world.md`)).toBe(
      "/posts/hello-world"
    );
  });

  it("returns a nested post path without underscored directories", () => {
    expect(
      getPath("guides/my-post", `${BLOG_PATH}/Guides/_drafts/My Post.md`, false)
    ).toBe("/guides/my-post");
  });
});

describe("blog collection helpers", () => {
  it("sorts published posts by modified date first, then published date", () => {
    const older = createPost({
      id: "older",
      data: {
        pubDatetime: new Date("2023-01-01T00:00:00.000Z"),
        modDatetime: null,
        tags: ["JavaScript"],
      },
    });
    const newer = createPost({
      id: "newer",
      data: {
        pubDatetime: new Date("2023-01-02T00:00:00.000Z"),
        modDatetime: new Date("2023-01-03T00:00:00.000Z"),
        tags: ["TypeScript"],
      },
    });

    expect(getSortedPosts([older, newer] as never)).toMatchObject([
      { id: "newer" },
      { id: "older" },
    ]);
  });

  it("returns unique sorted tag objects from published posts", () => {
    const posts = [
      createPost({
        id: "one",
        data: {
          pubDatetime: new Date("2023-01-01T00:00:00.000Z"),
          modDatetime: null,
          tags: ["TypeScript", "JavaScript"],
        },
      }),
      createPost({
        id: "two",
        data: {
          pubDatetime: new Date("2023-01-02T00:00:00.000Z"),
          modDatetime: null,
          tags: ["JavaScript", "Web Development"],
        },
      }),
    ];

    expect(getUniqueTags(posts as never)).toEqual([
      { tag: "java-script", tagName: "JavaScript" },
      { tag: "type-script", tagName: "TypeScript" },
      { tag: "web-development", tagName: "Web Development" },
    ]);
  });
});
