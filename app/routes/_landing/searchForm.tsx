import { Form } from "@remix-run/react";

function SearchForm({ hidden }: { hidden: boolean }) {
  return (
    <Form className={"w-full"} action={"/"}>
      <input type="search" />
    </Form>
  );
}