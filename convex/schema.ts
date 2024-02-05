import { v } from "convex/values";
import { defineSchema, defineTable } from "convex/server";

export default defineSchema({
  boards: defineTable({
    title: v.string(),
    ordId: v.string(),
    authorId: v.string(),
    authorName: v.string(),
    imageUrl: v.string(),
  })
    .index("by_org", ["ordId"])
    .searchIndex("search_title", {
      searchField: "title",
      filterFields: ["ordId"],
    }),
});
