import { useEffect, useState } from "react";

export const useAddresses = (currencyName: string) => {
  const [addresses, setAddressses] = useState<string[]>([]);

  useEffect(() => {
    setAddressses(
      JSON.parse(localStorage.getItem(currencyName + "Addresses") || "[]")
    );
  }, []);

  return addresses;
};
