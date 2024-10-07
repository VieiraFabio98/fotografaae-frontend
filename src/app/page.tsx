"use client"
import { Button } from "@/components/ui/button"
import { FaFacebookF, FaGoogle } from "react-icons/fa"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { useRouter } from 'next/navigation'

export default function Home() {

  const { toast } = useToast()
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLoginClick = async () => {
    const valid = validateLogin(email, password)
    if(!valid) {
      toast({
        title: "Erro de Login",
        description: "Email ou senha inválidos.",
        duration: 3000,
      })
      return
    }

    try {
      const response = await fetch("http://localhost:3333/sessions", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ login: email, password: btoa(password) })
      })

      if(response.status === 200) {
        const data = await response.json()
        localStorage.setItem("token", data.token)
        localStorage.setItem("refreshToken", data.refreshToken)
        localStorage.setItem("user", JSON.stringify(data.user))
      } else {
        toast({
          title: "Erro de Login",
          description: "Ocorreu um erro com o servidor.",
          duration: 3000,
        })
      }
    
    } catch(e) {
      console.log(e)
    }
  }

  function validateLogin(email: string, password: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return false
    }

    if (password.length < 5) {
      return false
    }  

    return true
  }

  const handleRegisterClick = () => {
    router.push("/register")
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-violet-100">
      <main className="flex felx-col items-center justify-center w-full flex-1 px-20 text-center">
        <div className="bg-white rounded-2xl shadow-2xl flex flex-row w-2/3 max-w-4xl">
          <div className="w-3/5 p-5">
            <div className="text-left font-bold text-2xl"><span className="text-violet-500">Fotografa</span> Ae!</div>
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
                  <a href="#" className="text-xs hover:text-violet-500">Esqueceu sua senha ?</a>
                </div>
                <div className="flex justify-between w-64">
                  <Button className="bg-violet-500 hover:bg-violet-700" onClick={handleLoginClick}>Entrar</Button>
                  <Button className="bg-violet-500 hover:bg-violet-700" onClick={handleRegisterClick}>Cadastrar</Button>
                </div>
                <Toaster />
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
