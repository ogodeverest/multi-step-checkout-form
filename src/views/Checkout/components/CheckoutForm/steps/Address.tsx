import { ChangeEvent, useState } from "react";
import { MapPin, Navigation, Map, Home } from "react-feather";
import { Input, Form, Select } from "@components";
import { Country, City, ICountry, ICity } from "country-state-city";
import useStepFormData from "@hooks/useStepFormData";

export default function Address(): JSX.Element {
  const { register, formErrors, values, touchedInputs } =
    useStepFormData("address");

  let presistedCountry: string = values?.country;

  const [selectedCountry, setSelectedCountry] = useState<ICountry | undefined>(
    Country.getCountryByCode(presistedCountry)
  );

  const { onChange, ...rest } = register("country");

  function handleCountryChange(e: ChangeEvent<HTMLSelectElement>) {
    const { value } = e.target;
    setSelectedCountry(Country.getCountryByCode(value));
    onChange(e);
  }

  return (
    <Form>
      <Select
        type="text"
        placeholder="Country"
        icon={<Map />}
        label="Country"
        {...rest}
        onChange={handleCountryChange}
        helperText={formErrors?.country?.message as string}
        error={!!formErrors?.country}
        done={!formErrors?.country && touchedInputs?.country}
      >
        <option value="">Select country</option>
        {Country.getAllCountries().map((country) => (
          <option value={country.isoCode} key={country.isoCode}>
            {country.name}
          </option>
        ))}
      </Select>
      <Select
        type="text"
        placeholder="City"
        icon={<MapPin />}
        label="City"
        {...register("city")}
        helperText={formErrors?.city?.message as string}
        error={!!formErrors?.city}
        done={!formErrors?.city && touchedInputs?.city}
      >
        <option value="">Select city</option>
        {!!selectedCountry &&
          (City.getCitiesOfCountry(selectedCountry.isoCode) as ICity[]).map(
            (city) => (
              <option value={city.name} key={city.name}>
                {city.name}
              </option>
            )
          )}
      </Select>
      <Input
        type="number"
        placeholder="Zipcode"
        icon={<MapPin />}
        label="Zipcode"
        {...register("zipcode")}
        helperText={formErrors?.zipcode?.message as string}
        error={!!formErrors?.zipcode}
        done={!formErrors?.zipcode && touchedInputs?.zipcode}
      />
      <Input
        type="number"
        placeholder="House number"
        icon={<Home />}
        label="House number"
        {...register("houseNumber")}
        helperText={formErrors?.houseNumber?.message as string}
        error={!!formErrors?.houseNumber}
        done={!formErrors?.houseNumber && touchedInputs?.houseNumber}
      />
      <Input
        type="text"
        placeholder="Street"
        icon={<Navigation />}
        label="Street"
        {...register("street")}
        helperText={formErrors?.street?.message as string}
        error={!!formErrors?.street}
        done={!formErrors?.street && touchedInputs?.street}
      />
    </Form>
  );
}
