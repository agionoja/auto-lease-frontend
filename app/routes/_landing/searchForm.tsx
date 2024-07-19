import { Form } from "@remix-run/react";
import { SearchIcon } from "~/components/icons";
import closeIcons from "~/assets/logo/close-del-svgrepo-com.svg";

type Props = {
  hidden: boolean;
  onHidden: (value: boolean) => void;
};

export function SearchForm({ hidden = true }: Props) {
  return (
    !hidden && (
      <Form
        className={
          "ml-auto h-32 w-[32rem] rounded-lg bg-white p-4 pl-8 shadow-md"
        }
        action={"/search"}
      >
        <label
          className={
            "flex w-4/6 items-center gap-3 rounded-2xl bg-white px-4 py-2 outline outline-2 outline-secondary"
          }
        >
          <span hidden={true}>search</span>
          <input
            className={"outline-none"}
            type="search"
            placeholder={"search..."}
            autoComplete={"on"}
          />
          <SearchIcon fill={"black"} height={20} width={20} />
          <button hidden={true} name={"_action"} value={"search-product"} />
        </label>
      </Form>
    )
  );
}
