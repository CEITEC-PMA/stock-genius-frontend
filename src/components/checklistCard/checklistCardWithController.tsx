import React from "react";
import { Control, Controller, FieldValues } from "react-hook-form";
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
const ChecklistCardWithController = ({
  name,
  alt,
  src,
  control,
}: {
  name: string;
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
