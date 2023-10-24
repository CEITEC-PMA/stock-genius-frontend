import React from "react";
import { Control, Controller, FieldValues } from "react-hook-form";
import ChecklistCard from "./";

const ChecklistCardWithController = ({
  name,
  label,
  alt,
  src,
  control,
}: {
  name: string;
  label: string;
  alt: string;
  src: string;
  control: Control<FieldValues, any>;
}) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={false}
      render={({ field }) => (
        <ChecklistCard
          label={label}
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
