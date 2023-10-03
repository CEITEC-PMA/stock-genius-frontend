import React from "react";
import { Controller } from "react-hook-form";
import ChecklistCard from "./";

const ChecklistCardWithController = ({ name, alt, src, control }) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={false}
      render={({ field }) => (
        <ChecklistCard
          name={name}
          alt={alt}
          src={src}
          checked={field.value}
          onClick={() => field.onChange(!field.value)}
        />
      )}
    />
  );
};

export default ChecklistCardWithController;
