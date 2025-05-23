import DefaultNavbarItem from "@theme/NavbarItem/DefaultNavbarItem";
import DropdownNavbarItem from "@theme/NavbarItem/DropdownNavbarItem";
import type {
    DesktopOrMobileNavBarItemProps as DefaultNavbarItemProps,
    Props as DefaultWithMobileProps,
} from "@theme/NavbarItem/DefaultNavbarItem";
import type {
    DesktopOrMobileNavBarItemProps as DropdownNavbarItemProps,
    Props as DropdownWithMobileProps,
} from "@theme/NavbarItem/DropdownNavbarItem";
import useIsBrowser from "@docusaurus/useIsBrowser";
import { ReactNode } from "react";

export interface Props {
    readonly dropdownProps: DropdownNavbarItemProps;
    readonly linkProps: DefaultNavbarItemProps;
    readonly specialPage: string;
    readonly mobile?: boolean;
}

export default function DropdownExceptOnPage(props: Props): ReactNode {
    const dropdownProps: DropdownWithMobileProps = {
        ...props.dropdownProps,
        mobile: props.mobile,
    };
    const defaultProps: DefaultWithMobileProps = {
        ...props.linkProps,
        mobile: props.mobile,
    };

    return !useIsBrowser() ||
        window.location.pathname.startsWith(`/${props.specialPage}`)
        ? DefaultNavbarItem(defaultProps)
        : DropdownNavbarItem(dropdownProps);
}
