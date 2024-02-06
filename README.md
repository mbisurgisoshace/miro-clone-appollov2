# Appollo - Miro Clone Exercise

Miro clone application, with most common features of a canvas app, like zooming, panning, drawing shapes, text, etc. It includes multi-user collaboration as well as real time collaboration.
The idea is that we see what we can accomplish with this demo, and how much we can use as either a base, or for ideas for the Appollo Builder, and maybe once we have the final demo, try to extend it with some of Appollo use cases.

## Starting the application

### Running Next application (frontend)
`npm run dev`

### Running Convex functions (backend)
`npx convex dev`

## Backend & Db with Convex

Convex provides a realtime configuration Backend & Database. You can use a Convex project to create API routes for your project to connect to and store information on a Database.

## Authentication with Clerk

Clerk provides ready to use authentication features, which includes multiple authentication providers, as well as allowing having organizations within users. Clerk will handle everything related to managing users, keeping track of the current auth state on the app to decide which pages are accessible and which ones are not. 

Clerk will provide with out the box UI components for login, signup, code verification, resetting password, creating organizations, inviting members to organizations, managing user and organization profiles.

In this application we are integrating it with Convex, which allows to easily protect our database and APIs only to authenticated users.

## Defining data model with Convex

A `schema.ts` file needs to be created within the `convex` folder in the root of the project.

Then we need to export a `defineSchema` object. For example, for creating the ***board*** model:
```
export default defineSchema({
  boards: defineTable({
    title: v.string(),
    ordId: v.string(),
    aithorId: v.string(),
    authorName: v.string(),
    imageUrl: v.string(),
  })
    .index("by_org", ["ordId"])
    .searchIndex("search_title", {
      searchField: "title",
      filterFields: ["ordId"],
    }),
});
```

## Defining API routes with Convex

We need to define a file within the `convex` folder which will have exported functions that will interact with the convex enviroment.

Most objects that will be provided from `./_generated/server` (mutation, query, etc) are called with an object that contains two properties which are ***args*** and ***handler***. 

The args are the ones that will be sent to the handler function, and we should define the type of this arguments.

The handler is a function that will be called with ***ctx*** and ***args***. ***ctx*** provides access to all the Convex enviroment (auth, db, scheduler, storage), not just only the DB.

### Mutations

This is how we can interact with the Convex DB. For accessing all DB methods, we simply call `ctx.db` and we will have access to all DB operations like create, update, delete, get, etc. For example: 
```
    const board = await ctx.db.insert("boards", {
      title: args.title,
      ordId: args.orgId,
      authorId: identity.subject,
      authorName: identity.name!,
      imageUrl: randomImage,
    });
```

### Example of use

Once the API route is created, which includes a mutation, Convex will generate all the typesafe methods automatically so it can be then use on the React application. For example: 
```
"use client";

import Image from "next/image";
import { useMutation } from "convex/react";

import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";

function EmptyBoards() {
  const create = useMutation(api.board.create);

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image alt="Empty" width={110} height={110} src="/note.svg" />
      <h2 className="text-2xl font-semibold mt-6">Create your first board!</h2>
      <p className="text-muted-foreground text-sm mt-2">
        Start by creating a board for your organization
      </p>
      <div className="mt-6 ">
        <Button size="lg">Create board</Button>
      </div>
    </div>
  );
}

export default EmptyBoards;
```

## Zustand

It is a simple state library. It only requires creating a ***store*** in the form of a React Hook, and then use it across your components on your app.

When creating a store, you need to use the `create` function, which will be invoke with a ***set*** function which is used to update the state. This invoke function will be pass as parameters an object which contains your state values and your state update functions.

```
import { create } from "zustand";

const defaultValues = { id: "", title: "" };

interface IRenameModal {
  isOpen: boolean;
  onClose: () => void;
  initialValues: typeof defaultValues;
  onOpen: (id: string, title: string) => void;
}

export const useRenameModal = create<IRenameModal>((set) => ({
  isOpen: false,
  onOpen: (id, title) => set({ isOpen: true, initialValues: { id, title } }),
  onClose: () =>
    set({
      isOpen: false,
      initialValues: defaultValues,
    }),
  initialValues: defaultValues,
}));
```

## Modal Provider

You will see on the code a component called `ModalProvider.tsx`. This is a way of solving some hidration issues when trying to programmatically control Modals. So basically, we create a component that will only render this sort of modals, only once the component is actually run on the client, and the way of knowing this is by using the `useEffect` hook, which is only trigger on the client. After that we can set that the component was actually mounted, and then render the modals.
In NextJS, even components that are annottated as `use client`, are still SSR, but they are not Server Components. 
```
"use client";

import { useEffect, useState } from "react";

import RenameModal from "@/components/modals/RenameModal";

export function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <RenameModal />
    </>
  );
}
```