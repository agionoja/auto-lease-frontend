import Form from "~/components/form";

const inputs = [{}];

export default function App() {
  return (
    <Form
      inputArr={[
        {
          label: "Test",
          inputProps: {
            name: "test",
            placeholder: "TEsting",
            type: "text",
          },
        },
      ]}
    />
  );
}
