"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MultiSelect } from "@/components/ui/multi-select"
import { useState, useEffect } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"


export default function Register() {
  
  const [categories, setCategories] = useState<{ value: string; label: string }[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3333/categories/select", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        });
  
        const data = await response.json()
        const categoriesList = data.items.map((item: { value: string; label: string }) => ({
          value: item.value,
          label: item.label
        }))
        setCategories(categoriesList)
        
      } catch (error) {
        console.error("Erro ao buscar dados: ", error)
      }
    }

    fetchData()
  }, [])
  
  return (
    <div className="bg-violet-200 min-h-screen py-2 flex items-center flex-col">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div className="bg-white rounded-2xl shadow-2xl flex flex-row w-2/3 max-w-3xl">
          <div className="w-full p-5">
            <h2 className="text-2xl font-bold mb-6 text-left">Informe seus dados</h2>
            <form className="flex flex-col gap-4">

              <div className="flex flex-row gap-4">
                <div className="grid w-full max-w-sm items-start gap-1.5">
                  <Label htmlFor="name" className="text-left">Nome</Label>
                  <Input
                    type="text"
                    id="name"
                    className="border border-gray-300 rounded-lg p-2"
                    placeholder="Nome"
                  />
                </div>
                <div className="grid w-full max-w-sm items-start gap-1.5">
                  <Label htmlFor="lastName" className="text-left">Sobrenome</Label>
                  <Input
                    type="text"
                    id="lastName"
                    className="border border-gray-300 rounded-lg p-2"
                    placeholder="Sobrenome"
                  />
                </div>
              </div>

              <div className="flex flex-row gap-4 w-full">
                <div className="flex flex-col w-1/3 items-start gap-1.5">
                  <Label htmlFor="cpf" className="text-left">CPF</Label>
                  <Input
                    type="text"
                    id="cpf"
                    className="border border-gray-300 rounded-lg p-2 w-full"
                    placeholder="CPF"
                  />
                </div>
                <div className="flex flex-col w-2/3 items-start gap-1.5">
                  <Label htmlFor="categories" className="text-left">Categorias</Label>
                  <MultiSelect
                    className="text-gray-600 w-full"
                    placeholder="algo"
                    options={categories}
                    onValueChange={setSelectedCategories}
                    defaultValue={selectedCategories}
                    
                    animation={2}
                    maxCount={5}
                  />
                </div>
              </div>

              <div className="flex flex-row gap-4">
                <div className="grid w-full max-w-sm items-start gap-1.5">
                  <Label htmlFor="email" className="text-left">Email</Label>
                  <Input
                    type="email"
                    id="email"
                    className="border border-gray-300 rounded-lg p-2 w-full"
                    placeholder="Email"
                  />
                </div>
                <div className="grid w-full max-w-sm items-start gap-1.5">
                  <Label htmlFor="email" className="text-left">Telefone</Label>
                  <Input
                    type="tel"
                    id="telefone"
                    className="border border-gray-300 rounded-lg p-2"
                    placeholder="(99)99999-9999"
                  />
                </div>
              </div>

              <div className="grid w-full items-start gap-1.5">
                <Label htmlFor="email" className="text-left">Fale um pouquinho sobre você, se quiser é claro !</Label>
                <Textarea
                  id="descricao"
                  className="border border-gray-300 rounded-lg p-2"
                  placeholder=""
                />
              </div>

              <Button type="submit" className="bg-violet-500 hover:bg-violet-700 text-white rounded-lg p-2">
                Enviar
              </Button>
            </form>
          </div>
        </div>
      </main>
    </div>

  )
}