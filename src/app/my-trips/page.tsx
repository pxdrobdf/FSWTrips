"use client";

import { Prisma } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import UserReservationItem from "./components/UserReservationItem";
import Button from "@/components/Button";
import Link from "next/link";
import GoBack from "@/components/GoBack";

function MyTrips() {
  const [reservations, setReservations] = useState<
    Prisma.TripReservationGetPayload<{
      include: { trip: true };
    }>[]
  >([]);

  const { status, data } = useSession();

  const router = useRouter();

  const fetchReservations = async () => {
    const response = await fetch(
      `/api/user/${(data?.user as any)?.id}/reservations`
    );
    const json = await response.json();

    setReservations(json);
  };

  useEffect(() => {
    if (status === "unauthenticated") {
      return router.push("/");
    }

    fetchReservations();
  }, [status]);

  return (
    <div className="container mx-auto p-5 ">
      <div className="mb-2">
        <GoBack />
      </div>
      <h1 className="font-semibold text-primaryDarker text-xl lg:mb-5">
        Minhas Viagens
      </h1>
      {reservations.length > 0 ? (
        reservations?.map((reservation) => (
          <div
            key={reservation.id}
            className="flex flex-col lg:grid lg:grid-cols-3 lg:gap-14"
          >
            <UserReservationItem
              reservation={reservation}
              fetchReservations={fetchReservations}
              key={reservation.id}
            />
          </div>
        ))
      ) : (
        <div className="flex flex-col justify-center lg:max-w-[500px]">
          <p className="font-medium text-primaryDarker mt-2">
            Você ainda não possui nenhuma reserva!
          </p>
          <Link href={"/"}>
            <Button className="w-full mt-2 lg:mt-5" variant={"primary"}>
              Fazer Reserva
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default MyTrips;
