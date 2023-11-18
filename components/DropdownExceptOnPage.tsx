import DefaultNavbarItem from "@theme/NavbarItem/DefaultNavbarItem";
import DropdownNavbarItem from "@theme/NavbarItem/DropdownNavbarItem";
import type { Props as DefaultNavbarItemProps } from "@theme/NavbarItem/DefaultNavbarItem";
import type { Props as DropdownNavbarItemProps } from "@theme/NavbarItem/DropdownNavbarItem";

export interface Props {
    readonly dropdownProps: DropdownNavbarItemProps;
    readonly linkProps: DefaultNavbarItemProps;
    readonly specialPage: string;
}

export default function DropdownExceptOnPage(props: Props): JSX.Element {
    return window.location.pathname.startsWith(`/${props.specialPage}`)
        ? DefaultNavbarItem(props.linkProps)
        : DropdownNavbarItem(props.dropdownProps);
}
