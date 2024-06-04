"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "src/lib/utils"
import { Button } from "src/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "src/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "src/components/ui/popover"

interface ComboboxProps<T> {
    list: T[],
    selected: (value: string | null) => void
}

export function ComboboxDemo({ list, selected }: ComboboxProps<any>) {

  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState(list[0]?.value)

  React.useEffect(() => {
    selected(value)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? list.find((framework) => framework.value === value)?.label
            : list[0]?.label}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          {/* <CommandInput placeholder="Search framework..." /> */}
          <CommandList>
            <CommandEmpty>Nenhum cartão encontrado</CommandEmpty>
            <CommandGroup>
              {list.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
