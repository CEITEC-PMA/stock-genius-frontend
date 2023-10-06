import React from "react";
import { Controller } from "react-hook-form";
import ChecklistCard from "./";

interface ChecklistCardWithControllerProps {
  name: string;
  alt: string;
  src: string;
  control: any;
}

const ChecklistCardWithController: React.FC<
  ChecklistCardWithControllerProps
> = ({ name, alt, src, control }) => {
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
