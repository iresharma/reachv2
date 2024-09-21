'use client'

import { useState } from "react"
import { Folder, File, ChevronRight, MoreVertical, Grid, List, HardDrive } from "lucide-react"
import { cn } from "~/lib/utils"
import { Button } from "~/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import { Progress } from "~/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table"

const initialFiles = [
  { id: 1, name: "Documents", type: "folder", size: "-", modified: "2023-06-01", owner: "Me" },
  { id: 2, name: "Images", type: "folder", size: "-", modified: "2023-05-28", owner: "Me" },
  { id: 3, name: "report.pdf", type: "file", size: "2.5 MB", modified: "2023-06-02", owner: "John Doe" },
  { id: 4, name: "budget.xlsx", type: "file", size: "1.8 MB", modified: "2023-05-30", owner: "Me" },
  { id: 5, name: "presentation.pptx", type: "file", size: "5.2 MB", modified: "2023-06-03", owner: "Jane Smith" },
  { id: 6, name: "project_notes.txt", type: "file", size: "0.1 MB", modified: "2023-06-04", owner: "Me" },
  { id: 7, name: "meeting_minutes.docx", type: "file", size: "0.8 MB", modified: "2023-06-05", owner: "John Doe" },
  { id: 8, name: "logo.png", type: "file", size: "3.2 MB", modified: "2023-06-06", owner: "Jane Smith" },
  { id: 9, name: "client_data", type: "folder", size: "-", modified: "2023-06-07", owner: "Me" },
  { id: 10, name: "archive", type: "folder", size: "-", modified: "2023-06-08", owner: "Me" },
  { id: 11, name: "contract.pdf", type: "file", size: "4.5 MB", modified: "2023-06-09", owner: "John Doe" },
  { id: 12, name: "expenses.csv", type: "file", size: "1.2 MB", modified: "2023-06-10", owner: "Me" },
]

const storageStats = {
  total: 100, // GB
  used: 65, // GB
  fileTypes: [
    { type: "Documents", count: 150 },
    { type: "Images", count: 230 },
    { type: "Videos", count: 50 },
  ],
}

export function FileExplorerComponent() {
  const [files, setFiles] = useState(initialFiles)
  const [selectedFile, setSelectedFile] = useState<number | null>(null)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [currentPath, setCurrentPath] = useState(["My Drive", "Hello"])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  const totalPages = Math.ceil(files.length / itemsPerPage)
  const paginatedFiles = files.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <div className="bg-background flex flex-col">
      <MainContent
        files={paginatedFiles}
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
        viewMode={viewMode}
        setViewMode={setViewMode}
        currentPath={currentPath}
        setCurrentPath={setCurrentPath}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  )
}

function MainContent({
  files,
  selectedFile,
  setSelectedFile,
  viewMode,
  setViewMode,
  currentPath,
  setCurrentPath,
}: {
  files: Array<{ id: number; name: string; type: string; size: string; modified: string; owner: string }>
  selectedFile: number | null
  setSelectedFile: (id: number | null) => void
  viewMode: "grid" | "list"
  setViewMode: (mode: "grid" | "list") => void
  currentPath: string[]
  setCurrentPath: (path: string[]) => void
}) {
  return (
    <div className="flex-1 overflow-auto">
      <StatsCards />
      <div className="flex justify-between items-center my-4">
        <Breadcrumb path={currentPath} setPath={setCurrentPath} />
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setViewMode("grid")}
            className={cn(viewMode === "grid" && "bg-muted")}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setViewMode("list")}
            className={cn(viewMode === "list" && "bg-muted")}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>
      {viewMode === "grid" ? (
        <GridView files={files} selectedFile={selectedFile} setSelectedFile={setSelectedFile} />
      ) : (
        <ListView files={files} selectedFile={selectedFile} setSelectedFile={setSelectedFile} />
      )}
    </div>
  )
}

function GridView({
  files,
  selectedFile,
  setSelectedFile,
}: {
  files: Array<{ id: number; name: string; type: string; size: string; modified: string; owner: string }>
  selectedFile: number | null
  setSelectedFile: (id: number | null) => void
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {files.map((file) => (
        <div
          key={file.id}
          className={cn(
            "p-4 rounded-lg cursor-pointer border",
            selectedFile === file.id && "bg-muted border-primary"
          )}
          onClick={() => setSelectedFile(file.id)}
        >
          <div className="flex items-center justify-between mb-2">
            {file.type === "folder" ? (
              <Folder className="h-8 w-8 text-blue-500" />
            ) : (
              <File className="h-8 w-8 text-gray-500" />
            )}
            <FileActions />
          </div>
          <h3 className="font-medium text-sm mb-1 truncate">{file.name}</h3>
          <div className="text-xs text-muted-foreground space-y-1">
            <p>Owner: {file.owner}</p>
            <p>Modified: {file.modified}</p>
            <p>Size: {file.size}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function ListView({
  files,
  selectedFile,
  setSelectedFile,
}: {
  files: Array<{ id: number; name: string; type: string; size: string; modified: string; owner: string }>
  selectedFile: number | null
  setSelectedFile: (id: number | null) => void
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[300px]">Name</TableHead>
          <TableHead>Owner</TableHead>
          <TableHead>Last modified</TableHead>
          <TableHead>File size</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {files.map((file) => (
          <TableRow
            key={file.id}
            className={cn(
              "cursor-pointer",
              selectedFile === file.id && "bg-muted"
            )}
            onClick={() => setSelectedFile(file.id)}
          >
            <TableCell className="font-medium">
              <div className="flex items-center">
                {file.type === "folder" ? (
                  <Folder className="h-5 w-5 text-blue-500 mr-2" />
                ) : (
                  <File className="h-5 w-5 text-gray-500 mr-2" />
                )}
                {file.name}
              </div>
            </TableCell>
            <TableCell>{file.owner}</TableCell>
            <TableCell>{file.modified}</TableCell>
            <TableCell>{file.size}</TableCell>
            <TableCell className="text-right">
              <FileActions />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="border col-span-2 rounded-lg p-4">
        <h3 className="text-sm font-medium mb-2">Storage</h3>
        <div className="flex items-center justify-between mb-2">
          <span className="text-2xl font-bold">{storageStats.used} GB</span>
          <span className="text-sm text-muted-foreground">of {storageStats.total} GB</span>
        </div>
        <Progress value={(storageStats.used / storageStats.total) * 100} className="h-2" />
      </div>
      <div className="border rounded-lg p-4">
        <h3 className="text-sm font-medium mb-2">File Types</h3>
        <ul className="space-y-1">
          {storageStats.fileTypes.map((fileType) => (
            <li key={fileType.type} className="flex justify-between items-center">
              <span>{fileType.type}</span>
              <span className="text-sm text-muted-foreground">{fileType.count}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="border rounded-lg p-4">
        <h3 className="text-sm font-medium mb-2">Quick Actions</h3>
        <div className="space-y-2">
          <Button variant="outline" className="w-full justify-start">
            <HardDrive className="mr-2 h-4 w-4" /> Manage Storage
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <File className="mr-2 h-4 w-4" /> Upload File
          </Button>
        </div>
      </div>
    </div>
  )
}

function Breadcrumb({ path, setPath }: { path: string[]; setPath: (path: string[]) => void }) {
  return (
    <div className="flex items-center space-x-1 text-sm">
      {path.map((item, index) => (
        <div key={index} className="flex items-center">
          {index > 0 && <ChevronRight className="h-4 w-4 mx-1" />}
          <Button
            variant="link"
            className="p-0 h-auto"
            onClick={() => setPath(path.slice(0, index + 1))}
          >
            {item}
          </Button>
        </div>
      ))}
    </div>
  )
}

function FileActions() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Share</DropdownMenuItem>
        <DropdownMenuItem>Move</DropdownMenuItem>
        <DropdownMenuItem>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function Pagination({ currentPage, totalPages, onPageChange }: { currentPage: number; totalPages: number; onPageChange: (page: number) => void }) {
  return (
    <div className="flex justify-center space-x-2 mt-4">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </Button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Button
          key={page}
          variant={currentPage === page ? "default" : "outline"}
          size="sm"
          onClick={() => onPageChange(page)}
        >
          {page}
        </Button>
      ))}
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </div>
  )
}
