"use client";

import Button from "@/components/Button";
import DatePicker from "@/components/DatePicker";
import Input from "@/components/Input";
import { Trip } from "@prisma/client";
import React from "react";
import { Controller, useForm } from "react-hook-form";

interface TripReservationProps {
  tripStartDate: Date;
  tripEndDate: Date;
  maxGuests: number;
}

interface TripReservationForm {
  guests: number;
  startDate: Date | null;
  endDate: Date | null;
}

const TripReservation = ({
  maxGuests,
  tripEndDate,
  tripStartDate,
}: TripReservationProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm<TripReservationForm>();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const startDate = watch("startDate");

  return (
    <div className="flex flex-col px-5">
      <div className="flex gap-4">
        <Controller
          name="startDate"
          rules={{
            required: {
              value: true,
              message: "Data de início é obrigatória!",
            },
          }}
          control={control}
          render={({ field }) => (
            <DatePicker
              error={!!errors?.startDate}
              errorMessage={errors.startDate?.message}
              placeholderText="Data de Início"
              onChange={field.onChange}
              selected={field.value}
              minDate={tripStartDate}
              className="w-full"
            />
          )}
        />
        <Controller
          name="endDate"
          rules={{
            required: {
              value: true,
              message: "Data final é obrigatória!",
            },
          }}
          control={control}
          render={({ field }) => (
            <DatePicker
              error={!!errors?.endDate}
              errorMessage={errors.endDate?.message}
              placeholderText="Data Final"
              onChange={field.onChange}
              selected={field.value}
              maxDate={tripEndDate}
              minDate={startDate ?? tripStartDate}
              className="w-full"
            />
          )}
        />
      </div>

      <Input
        {...register("guests", {
          required: {
            value: true,
            message: "Número de hóspedes é obrigatório!",
          },
        })}
        placeholder={`Número de hóspedes (max: ${maxGuests})`}
        className="mt-4"
        error={!!errors?.guests}
        errorMessage={errors.guests?.message}
      />

      <div className="flex justify-between mt-3">
        <p className="font-medium text-sm text-primaryDarker">Total: </p>
        <p className="font-medium text-sm text-primaryDarker">R$2500</p>
      </div>

      <div className="pb-10 border-b border-b-grayLighter w-full">
        <Button
          className="mt-3 w-full"
          variant={"primary"}
          onClick={() => handleSubmit(onSubmit)()}
        >
          Reservar agora
        </Button>
      </div>
    </div>
  );
};

export default TripReservation;
