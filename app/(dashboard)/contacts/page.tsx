"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  UserPlus,
  Edit,
  Trash2,
  Phone,
  Mail,
  Heart,
  Star,
  Users,
} from "lucide-react"

interface Contact {
  id: string
  name: string
  phone: string
  email: string
  relationship: string
  isPrimary: boolean
}

const initialContacts: Contact[] = [
  {
    id: "1",
    name: "John Doe",
    phone: "+1 555-0100",
    email: "john@example.com",
    relationship: "Spouse",
    isPrimary: true,
  },
  {
    id: "2",
    name: "Jane Doe",
    phone: "+1 555-0101",
    email: "jane@example.com",
    relationship: "Parent",
    isPrimary: false,
  },
  {
    id: "3",
    name: "Emergency Contact",
    phone: "+1 555-0199",
    email: "emergency@example.com",
    relationship: "Friend",
    isPrimary: false,
  },
]

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingContact, setEditingContact] = useState<Contact | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    relationship: "",
    isPrimary: false,
  })

  const handleOpenDialog = (contact?: Contact) => {
    if (contact) {
      setEditingContact(contact)
      setFormData({
        name: contact.name,
        phone: contact.phone,
        email: contact.email,
        relationship: contact.relationship,
        isPrimary: contact.isPrimary,
      })
    } else {
      setEditingContact(null)
      setFormData({
        name: "",
        phone: "",
        email: "",
        relationship: "",
        isPrimary: false,
      })
    }
    setIsDialogOpen(true)
  }

  const handleSave = () => {
    if (editingContact) {
      setContacts(
        contacts.map((c) =>
          c.id === editingContact.id
            ? {
                ...c,
                ...formData,
                isPrimary: formData.isPrimary
                  ? true
                  : c.isPrimary && !formData.isPrimary,
              }
            : formData.isPrimary && c.isPrimary
            ? { ...c, isPrimary: false }
            : c
        )
      )
    } else {
      const newContact: Contact = {
        id: Date.now().toString(),
        ...formData,
        isPrimary: formData.isPrimary,
      }
      if (formData.isPrimary) {
        setContacts(
          contacts.map((c) => ({ ...c, isPrimary: false })).concat(newContact)
        )
      } else {
        setContacts(contacts.concat(newContact))
      }
    }
    setIsDialogOpen(false)
  }

  const handleDelete = (id: string) => {
    setContacts(contacts.filter((c) => c.id !== id))
    setDeleteConfirm(null)
  }

  const handleSetPrimary = (id: string) => {
    setContacts(
      contacts.map((c) => ({
        ...c,
        isPrimary: c.id === id,
      }))
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold font-heading">
              Emergency Contacts
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage your emergency contact list
            </p>
          </div>
          <Button onClick={() => handleOpenDialog()} disabled={contacts.length >= 5}>
            <UserPlus className="mr-2 h-4 w-4" />
            Add Contact
          </Button>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
      >
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Contacts</p>
                <p className="text-2xl font-bold">{contacts.length}/5</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-success/10">
                <Star className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Primary Contact</p>
                <p className="text-2xl font-bold">
                  {contacts.filter((c) => c.isPrimary).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-amber-500/10">
                <Heart className="h-6 w-6 text-amber-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">SOS Ready</p>
                <p className="text-2xl font-bold">
                  {contacts.length > 0 ? "Yes" : "No"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Contacts List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Contact List</CardTitle>
          </CardHeader>
          <CardContent>
            {contacts.length === 0 ? (
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No emergency contacts yet</p>
                <Button
                  onClick={() => handleOpenDialog()}
                  className="mt-4"
                  variant="outline"
                >
                  Add your first contact
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                <AnimatePresence>
                  {contacts.map((contact) => (
                    <motion.div
                      key={contact.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className={`flex items-center justify-between p-4 rounded-lg border transition-all ${
                        contact.isPrimary
                          ? "border-primary/50 bg-primary/5"
                          : "border-border bg-secondary"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback>
                            {contact.name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-semibold">{contact.name}</p>
                            {contact.isPrimary && (
                              <Badge variant="default" className="text-xs">
                                Primary
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {contact.relationship}
                          </p>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              {contact.phone}
                            </span>
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              {contact.email}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {!contact.isPrimary && (
                          <Button
                            onClick={() => handleSetPrimary(contact.id)}
                            variant="ghost"
                            size="sm"
                          >
                            <Star className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          onClick={() => handleOpenDialog(contact)}
                          variant="ghost"
                          size="icon"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          onClick={() => setDeleteConfirm(contact.id)}
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingContact ? "Edit Contact" : "Add Emergency Contact"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                placeholder="+1 555-0100"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="john@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="relationship">Relationship</Label>
              <Input
                id="relationship"
                value={formData.relationship}
                onChange={(e) =>
                  setFormData({ ...formData, relationship: e.target.value })
                }
                placeholder="Spouse, Parent, Friend..."
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isPrimary"
                checked={formData.isPrimary}
                onChange={(e) =>
                  setFormData({ ...formData, isPrimary: e.target.checked })
                }
                className="rounded border-border"
              />
              <Label htmlFor="isPrimary" className="font-normal">
                Set as primary contact (first to be notified)
              </Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {editingContact ? "Save Changes" : "Add Contact"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Contact</DialogTitle>
          </DialogHeader>
          <p className="py-4">
            Are you sure you want to delete this contact? This action cannot be
            undone.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteConfirm(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => deleteConfirm && handleDelete(deleteConfirm)}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}