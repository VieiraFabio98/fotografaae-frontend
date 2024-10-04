"use client"
import { Button } from "@/components/ui/button"
import { FaFacebookF, FaGoogle, FaEnvelope } from "react-icons/fa"
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

export default function Home() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLoginClick = () => {
    console.log("Email:", email)
    console.log("Senha:", password)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-violet-100">
      <main className="flex felx-col items-center justify-center w-full flex-1 px-20 text-center">
        <div className="bg-white rounded-2xl shadow-2xl flex flex-row w-2/3 max-w-4xl">
          <div className="w-3/5 p-5">
            <div className="text-left font-bold"><span className="text-violet-500">Fotografa</span> Ae!</div>
            <div className="py-10">
              <h2 className="text-3xl font-bold text-violet-300">Login</h2>
              <div className="border-2 w-10 border-violet-300 inline-block"></div>
              <div className="flex justify-center my-2">
                <a href="" className="border-2 border-gray-200 rounded-full p-3 mx-1">
                  <FaFacebookF className="text-1xl " />
                </a>
                <a href="" className="border-2 border-gray-200 rounded-full p-3 mx-1">
                  <FaGoogle className="text-1xl " />
                </a>
              </div>
              <p className="text-gray-400 my-3">ou use seu email</p>
              <div className="flex flex-col items-center">
                <div className="w-64 py-2">
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="Email"
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="w-64 py-2">
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="flex justify-between w-64 mb-5">
                  <label className="flex items-center text-xs"><Checkbox className="mr-1"></Checkbox>Lembre de mim</label>
                  <a href="#" className="text-xs ">Esqueceu sua senha ?</a>
                </div>
                <Button className="bg-violet-500 hover:bg-violet-700" onClick={handleLoginClick}>Entrar</Button>
              </div>
            </div>
          </div>
          <div className="w-2/5 bg-violet-300 text-white rounded-tr-2xl rounded-br-2xl py-36 px-12">
            <h2 className="text-2xl font-bold">Deseja encontrar um <span className="text-violet-600">fotógrafo</span> ?</h2>
            <div className="border-2 w-10 border-white inline-block"></div>
            <p className="mb-2">Clique aqui e ache um</p>
            <Button className="bg-violet-500 hover:bg-violet-700">Encontrar</Button>
          </div>
        </div>
      </main>
    </div>
  )
}
