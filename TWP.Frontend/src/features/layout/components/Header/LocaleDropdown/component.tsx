import { DropdownOption } from "features/common/components/Dropdown";
import { locales } from "features/common/constants";
import { Locale } from "features/common/types";
import HeaderDropdown from "features/layout/components/Header/HeaderDropdown";
import { setLocaleInStorage } from "features/layout/utils";

export interface Props {
    ["data-testid"]?: string;
    locale: Locale;
    setLocale: (locale: Locale) => void;
}

const LocaleDropdown = ({ "data-testid": testId = "locale-dropdown", locale, setLocale }: Props) => {
    const options: DropdownOption<Locale>[] = locales.map((locale) => ({
        display: locale.toUpperCase(),
        value: locale,
    }));

    const selectedOption = options.find((option) => option.value === locale)!;

    const onSelect = (locale: Locale) => {
        setLocaleInStorage(locale);
        setLocale(locale);
    };

    return (
        <HeaderDropdown
            data-testid="locale-dropdown"
            options={options}
            toggleContent={`${selectedOption.display}`}
            selectedOption={selectedOption}
            onSelect={onSelect}
        />
    );
};

export default LocaleDropdown;
