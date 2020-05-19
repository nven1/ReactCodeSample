import React, { useState, useEffect } from "react"
import styles from "./SideSelect.module.scss"
import classNames from "classnames"
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io"

export interface SideSelectOptionType {
    label: string
    value: string
}

interface SideSelectProps {
    options: Array<SideSelectOptionType>
    selectedIndex?: number
    label: string
    cardFit?: boolean
    onSelect: (data: any) => void
}

const SideSelect: React.FC<SideSelectProps> = (props) => {
    const classProps = classNames(styles.container, {
        [styles.cardFit]: props.cardFit,
    })

    const [selectedIndex, setselectedIndex] = useState<number>(props.selectedIndex ?? 0)

    useEffect(() => {
        if (props.selectedIndex !== undefined) {
            setselectedIndex(Number(props.selectedIndex))
        }

        // eslint-disable-next-line
    }, [props.selectedIndex])

    useEffect(() => {
        props.onSelect(props.options[selectedIndex].value)

        // eslint-disable-next-line
    }, [selectedIndex])

    const isNotFirst = selectedIndex > 0
    const isNotLast = selectedIndex < props.options.length - 1

    const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        e.stopPropagation()
        if (isNotLast) {
            setselectedIndex(selectedIndex + 1)
        }
    }

    const handlePrevious = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        e.stopPropagation()
        if (isNotFirst) {
            setselectedIndex(selectedIndex - 1)
        }
    }

    const prevent = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
    }

    return (
        <div className={classProps} onClick={prevent}>
            <div className={styles.sideSelect}>
                <button disabled={!isNotFirst} onClick={handlePrevious}>
                    <IoIosArrowBack />
                </button>
                <span>{props.options[selectedIndex].label}</span>
                <button disabled={!isNotLast} onClick={handleNext}>
                    <IoIosArrowForward />
                </button>
            </div>
        </div>
    )
}
export default SideSelect
