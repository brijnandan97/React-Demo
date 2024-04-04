import "./App.css";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import { useEffect, useState } from "react";
import { RJSFSchema } from "@rjsf/utils";

const schemas = {
  title: "A registration form",
  description: "A simple form example.",
  type: "object",
  required: ["firstName", "lastName"],
  properties: {
    firstName: {
      type: "string",
      title: "First name",
      default: "Chuck",
    },
    lastName: {
      type: "string",
      title: "Last name",
    },
    age: {
      type: "string",
      title: "Age",
    },
    bio: {
      type: "string",
      title: "Bio",
    },
    password: {
      type: "string",
      title: "Password",
      minLength: 3,
    },
    telephone: {
      type: "string",
      title: "Telephone",
      minLength: 10,
    },
  },
};

const uiSchema = {
  firstName: {
    "ui:autofocus": false,
    "ui:emptyValue": "",
    "ui:placeholder":
      "ui:emptyValue causes this field to always be valid despite being required",
    "ui:autocomplete": "family-name",
    "ui:enableMarkdownInDescription": true,
    "ui:description":
      "Make text **bold** or *italic*. Take a look at other options [here](https://markdown-to-jsx.quantizor.dev/).",
  },
  lastName: {
    "ui:autocomplete": "given-name",
    "ui:enableMarkdownInDescription": true,
    "ui:description":
      "Make things **bold** or *italic*. Embed snippets of `code`. <small>And this is a small texts.</small> ",
  },
  age: {
    // "ui:widget": "updown",
    "ui:title": "Age of person",
    "ui:description": "(earth year)",
  },
  bio: {
    "ui:widget": "textarea",
  },
  password: {
    "ui:widget": "password",
    "ui:help": "Hint: Make it strong!",
  },
  telephone: {
    "ui:options": {
      inputType: "tel",
    },
  },
};

const App = () => {
  const [formData, setFormData] = useState({
    firstName: "Chuck",
    lastName: "Norris",
    age: "75",
    bio: "Roundhouse kicking asses since 1940",
    password: "noneed",
    telephone: "1-800-KICKASS",
  });

  const [schema,setSchema] = useState(schemas)
  const [filteredSchema,setFilteredSchema] = useState({})
  const [searchValue,setSearchValue] = useState("")

  const handleFormChange = (e) => {
    setFormData((prevValue)=>{return {
      ...prevValue,...e.formData
    }});
  };

  const handleInputChange = (e)=>{
    setSearchValue(e.target.value)

    const results = Object.keys(formData).filter(key =>
      formData[key].toLowerCase().includes(e.target.value.toLowerCase())
    );
    console.log(results);

    const newProperties = Object.fromEntries(
      Object.entries(schemas.properties).filter(([key, value]) => results.includes(key))
    );

    setFilteredSchema(()=>{
      return {...schema,properties:{...newProperties}}
    })
      
  }

  return (
    <>
      <input type="text" value ={searchValue} name="Search" placeholder="search" onChange={handleInputChange}/>
      <Form
        schema={searchValue.length ?  filteredSchema : schema}
        uiSchema={uiSchema}
        formData={formData}
        onChange={handleFormChange}
        validator={validator}
      />
    </>
  );
};

export default App;
