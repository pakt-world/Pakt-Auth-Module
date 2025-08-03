/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */
import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

/* -------------------------------------------------------------------------- */
/*                             Internal Dependency                            */
/* -------------------------------------------------------------------------- */
import { cn } from "../../utils";

const button = cva(
    "focus:pka-outline-none pka-py-3 pka-whitespace-nowrap pka-duration-200 pka-capitalize pka-focus-visible:ring-1 pka-focus-visible:ring-[#19A966] pka-relative pka-z-0 pka-rounded-[10px] pka-text-center pka-w-fit pka-px-6 pka-font-semibold pka-focus-visible:border-transparent",
    {
        variants: {
            variant: {
                primary:
                    "pka-border-white pka-border-opacity-10 pka-bg-btn-primary pka-text-white",
                secondary:
                    "pka-border-primary pka-border pka-text-primary pka-bg-primary-brighter pka-hover:bg-green-100 pka-duration-200 pka-font-normal",
                outline:
                    "pka-border-primary pka-border pka-text-primary pka-border-opacity-100 pka-bg-transparent pka-hover:border-opacity-50 pka-font-normal pka-duration-200",
                transparent:
                    "pka-border-transparent pka-text-primary pka-bg-transparent pka-hover:bg-[#008D6C1A] pka-duration-200",
                danger: "pka-bg-red-200 pka-text-red-600 pka-hover:bg-red-100 pka-border pka-border-transparent",
            },
            size: {
                xs: "pka-px-2 pka-py-[8px] pka-text-xs",
                sm: "pka-px-2 pka-py-2 pka-text-sm",
                md: "pka-px-3 pka-py-3 pka-text-base",
                lg: "pka-px-4 pka-py-4 pka-text-lg",
                xl: "pka-px-5 pka-py-5 pka-text-xl",
            },
            fullWidth: {
                true: "pka-w-full",
            },
            disabled: {
                true: "pka-cursor-not-allowed !pka-bg-none !pka-bg-[#E3E5E5] !pka-text-[#979C9E]",
            },
        },
        defaultVariants: {
            size: "md",
            variant: "primary",
        },
        compoundVariants: [
            {
                variant: "outline",
                disabled: true,
                className: "pka-border-gray-300",
            },
            {
                variant: "transparent",
                disabled: true,
                className: "pka-border-none pka-hover:bg-transparent",
            },
        ],
    }
);

const gradientHover = cva(
    "pka-absolute pka-inset-0 pka-rounded-lg pka-border pka-border-transparent pka-opacity-0 pka-duration-200 pka-hover:opacity-100 pka-pointer-events-none",
    {
        variants: {
            variant: {
                primary: "pka-bg-primary",
                secondary: "pka-bg-transparent",
                outline: "pka-bg-transparent",
                transparent: "pka-bg-transparent",
                danger: "pka-bg-transparent",
            },
            disabled: {
                true: "pka-bg-none pka-bg-transparent",
            },
        },
        defaultVariants: {
            variant: "primary",
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof button> {
    disabled?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        { variant, className, disabled, fullWidth, size, children, ...props },
        ref
    ) => {
        return (
            // eslint-disable-next-line react/button-has-type
            <button
                className={cn(
                    button({ disabled, size, fullWidth, variant }),
                    className
                )}
                disabled={disabled}
                ref={ref}
                {...props}
            >
                {children}
                <div className={gradientHover({ variant, disabled })} />
            </button>
        );
    }
);

export interface LinkButtonProps extends VariantProps<typeof button> {
    disabled?: boolean;
    className?: string;
    children: React.ReactNode;
    LinkComponent?: React.ElementType;
}

export const LinkButton = React.forwardRef<HTMLAnchorElement, LinkButtonProps>(
    (
        {
            variant,
            className,
            disabled,
            fullWidth,
            size,
            children,
            LinkComponent = "a",
            ...props
        },
        ref
    ) => {
        return (
            <LinkComponent
                {...props}
                ref={ref}
                className={cn(
                    button({ variant, disabled, size, fullWidth }),
                    className
                )}
            >
                {children}
                <div className={gradientHover({ variant, disabled })} />
            </LinkComponent>
        );
    }
);

export interface AnchorButtonProps
    extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
        VariantProps<typeof button> {
    disabled?: boolean;
}

export const AnchorButton = React.forwardRef<
    HTMLAnchorElement,
    AnchorButtonProps
>(
    (
        { variant, className, disabled, fullWidth, size, children, ...props },
        ref
    ) => {
        return (
            <a
                className={cn(
                    button({ variant, disabled, size, fullWidth }),
                    className
                )}
                ref={ref}
                {...props}
            >
                {children}
                <div className={gradientHover({ variant, disabled })} />
            </a>
        );
    }
);
