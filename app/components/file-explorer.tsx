'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "~/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Button } from "~/components/ui/button"
import { ScrollArea } from "~/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { ChevronLeft, ChevronRight } from 'lucide-react'

// Mock data
const projects = [
  {
    id: 1,
    name: "Website Redesign",
    thumbnail: "/placeholder.svg?height=200&width=300",
    iterations: [
      {
        id: 1,
        title: "Homepage Layout",
        image: "/placeholder.svg?height=400&width=600",
        comments: [
          { id: 1, author: "Alice", content: "I like the new hero section!" },
          { id: 2, author: "Bob", content: "Can we make the CTA more prominent?" }
        ]
      },
      {
        id: 2,
        title: "Product Page",
        image: "/placeholder.svg?height=400&width=600",
        comments: [
          { id: 3, author: "Charlie", content: "The gallery looks great!" },
          { id: 4, author: "David", content: "Let's add more product details." }
        ]
      }
    ]
  },
  {
    id: 2,
    name: "Mobile App",
    thumbnail: "/placeholder.svg?height=200&width=300",
    iterations: [
      {
        id: 3,
        title: "Login Screen",
        image: "/placeholder.svg?height=400&width=600",
        comments: [
          { id: 5, author: "Eve", content: "The form looks clean and simple." },
          { id: 6, author: "Frank", content: "Can we add social login options?" }
        ]
      }
    ]
  },
  {
    id: 3,
    name: "Marketing Campaign",
    thumbnail: "/placeholder.svg?height=200&width=300",
    iterations: [
      {
        id: 4,
        title: "Social Media Ad",
        image: "/placeholder.svg?height=400&width=600",
        comments: [
          { id: 7, author: "Grace", content: "The visuals are eye-catching!" },
          { id: 8, author: "Henry", content: "Let's tweak the copy a bit." }
        ]
      },
      {
        id: 5,
        title: "Email Newsletter",
        image: "/placeholder.svg?height=400&width=600",
        comments: [
          { id: 9, author: "Ivy", content: "The layout is well-organized." },
          { id: 10, author: "Jack", content: "Can we add more personalization?" }
        ]
      }
    ]
  }
]

export function FileExplorerComponent() {
  const [selectedProject, setSelectedProject] = useState(null)
  const [currentIteration, setCurrentIteration] = useState(0)

  const openModal = (project) => {
    setSelectedProject(project)
    setCurrentIteration(0)
  }

  const closeModal = () => {
    setSelectedProject(null)
    setCurrentIteration(0)
  }

  const nextIteration = () => {
    if (selectedProject && currentIteration < selectedProject.iterations.length - 1) {
      setCurrentIteration(currentIteration + 1)
    }
  }

  const prevIteration = () => {
    if (selectedProject && currentIteration > 0) {
      setCurrentIteration(currentIteration - 1)
    }
  }

  return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Project Storage</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
              <Card key={project.id} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => openModal(project)}>
                <CardHeader>
                  <CardTitle>{project.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <img src={project.thumbnail} alt={project.name} className="w-full h-40 object-cover rounded-md" />
                </CardContent>
              </Card>
          ))}
        </div>

        <Dialog open={selectedProject !== null} onOpenChange={closeModal}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>{selectedProject?.name}</DialogTitle>
            </DialogHeader>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="relative">
                {selectedProject && (
                    <>
                      <img
                          src={selectedProject.iterations[currentIteration].image}
                          alt={selectedProject.iterations[currentIteration].title}
                          className="w-full h-[300px] object-cover rounded-md"
                      />
                      <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-full flex justify-between px-4">
                        <Button variant="outline" size="icon" onClick={prevIteration} disabled={currentIteration === 0}>
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={nextIteration}
                            disabled={currentIteration === selectedProject.iterations.length - 1}
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-center mt-2">
                        {selectedProject.iterations[currentIteration].title} ({currentIteration + 1}/
                        {selectedProject.iterations.length})
                      </p>
                    </>
                )}
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Comments</h3>
                <ScrollArea className="h-[300px]">
                  {selectedProject &&
                      selectedProject.iterations[currentIteration].comments.map((comment) => (
                          <div key={comment.id} className="flex items-start space-x-4 mb-4">
                            <Avatar>
                              <AvatarFallback>{comment.author[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-semibold">{comment.author}</p>
                              <p className="text-sm text-gray-500">{comment.content}</p>
                            </div>
                          </div>
                      ))}
                </ScrollArea>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
  )
}
