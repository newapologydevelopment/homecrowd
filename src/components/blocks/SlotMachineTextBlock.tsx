'use client'

import { SlotMachineTextBlock as SlotMachineTextBlockType } from '@/types'
import { SlotMachine } from '../ui/SlotMachine'

interface SlotMachineTextBlockProps {
  block: SlotMachineTextBlockType
}

export function SlotMachineTextBlock({ block }: SlotMachineTextBlockProps) {
  return (
    <SlotMachine items={block.items} />
  )
}

