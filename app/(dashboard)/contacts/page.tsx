"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { UserPlus, Edit, Trash2, Phone, Mail, Star, Users, Heart, Shield, AlertTriangle } from "lucide-react"

interface Contact {
  id: string
  name: string
  phone: string
  email: string
  relationship: string
  isPrimary: boolean
}

const initialContacts: Contact[] = [
  { id: "1", name: "Priya Sharma",     phone: "+91 98765 43210", email: "priya@example.com",     relationship: "Spouse",  isPrimary: true  },
  { id: "2", name: "Ramesh Kumar",     phone: "+91 87654 32109", email: "ramesh@example.com",    relationship: "Parent",  isPrimary: false },
  { id: "3", name: "Anita Desai",      phone: "+91 76543 21098", email: "anita@example.com",     relationship: "Friend",  isPrimary: false },
]

const avatarColors = [
  "from-[var(--primary)] to-[var(--accent)]",
  "from-emerald-500 to-teal-500",
  "from-orange-500 to-red-500",
  "from-violet-500 to-purple-500",
  "from-pink-500 to-rose-500",
]

const emptyForm = { name: "", phone: "", email: "", relationship: "", isPrimary: false }

export default function ContactsPage() {
  const [contacts, setContacts]         = useState<Contact[]>(initialContacts)
  const [dialogOpen, setDialogOpen]     = useState(false)
  const [editContact, setEditContact]   = useState<Contact | null>(null)
  const [deleteId, setDeleteId]         = useState<string | null>(null)
  const [form, setForm]                 = useState(emptyForm)

  const openAdd = () => { setEditContact(null); setForm(emptyForm); setDialogOpen(true) }
  const openEdit = (c: Contact) => { setEditContact(c); setForm({ name: c.name, phone: c.phone, email: c.email, relationship: c.relationship, isPrimary: c.isPrimary }); setDialogOpen(true) }

  const handleSave = () => {
    if (editContact) {
      setContacts(contacts.map(c =>
        c.id === editContact.id ? { ...c, ...form } :
        form.isPrimary ? { ...c, isPrimary: false } : c
      ))
    } else {
      const newC: Contact = { id: Date.now().toString(), ...form }
      if (form.isPrimary) setContacts(contacts.map(c => ({ ...c, isPrimary: false })).concat(newC))
      else setContacts([...contacts, newC])
    }
    setDialogOpen(false)
  }

  const handleDelete = (id: string) => { setContacts(contacts.filter(c => c.id !== id)); setDeleteId(null) }
  const setPrimary   = (id: string) => setContacts(contacts.map(c => ({ ...c, isPrimary: c.id === id })))

  const primary = contacts.find(c => c.isPrimary)

  return (
    <div className="max-w-5xl mx-auto space-y-6">

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">Safety</p>
          <h1 className="text-2xl md:text-3xl font-bold font-heading">Emergency Contacts</h1>
          <p className="text-sm text-muted-foreground mt-1">Who to alert when something goes wrong.</p>
        </div>
        <Button variant="gradient" onClick={openAdd} disabled={contacts.length >= 5} className="gap-2 self-start sm:self-auto">
          <UserPlus className="h-4 w-4" />
          Add Contact
        </Button>
      </motion.div>

      {/* Stat row */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="grid grid-cols-3 gap-3">
        {[
          { icon: Users,  label: "Total Contacts", value: `${contacts.length}/5`, color: "text-[var(--primary)]",     bg: "bg-[var(--primary-glow)]"     },
          { icon: Star,   label: "Primary Set",     value: primary ? "Yes" : "No", color: "text-[var(--success)]",     bg: "bg-[var(--success-muted)]"     },
          { icon: Shield, label: "SOS Ready",       value: contacts.length > 0 ? "Active" : "None", color: contacts.length > 0 ? "text-[var(--success)]" : "text-[var(--destructive)]", bg: contacts.length > 0 ? "bg-[var(--success-muted)]" : "bg-[var(--destructive-muted)]" },
        ].map(({ icon: Icon, label, value, color, bg }) => (
          <Card key={label} className="card-hover">
            <CardContent className="p-4 flex items-center gap-3">
              <div className={`p-2 rounded-lg ${bg} flex-shrink-0`}>
                <Icon className={`h-4 w-4 ${color}`} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="text-lg font-bold font-mono">{value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* Primary banner */}
      {primary && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <div className="flex items-center gap-4 p-4 rounded-xl border border-[var(--primary)]/30 bg-[var(--primary-glow)]">
            <div className="p-2 rounded-lg bg-[var(--primary)] flex-shrink-0">
              <Star className="h-4 w-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-[var(--primary)] uppercase tracking-wide mb-0.5">Primary Contact — Notified First</p>
              <p className="font-semibold truncate">{primary.name}</p>
              <p className="text-xs text-muted-foreground">{primary.phone} · {primary.relationship}</p>
            </div>
            <Badge variant="info" className="flex-shrink-0">Primary</Badge>
          </div>
        </motion.div>
      )}

      {/* Contact list */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <div className="p-1.5 rounded-lg bg-[var(--primary-glow)]">
                <Users className="h-4 w-4 text-[var(--primary)]" />
              </div>
              Contact List ({contacts.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3">
            {contacts.length === 0 ? (
              <div className="text-center py-14">
                <div className="w-16 h-16 rounded-full bg-[var(--secondary)] flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-muted-foreground" />
                </div>
                <p className="font-medium mb-1">No emergency contacts yet</p>
                <p className="text-sm text-muted-foreground mb-4">Add people to notify in case of an emergency.</p>
                <Button variant="outline" onClick={openAdd} className="gap-2">
                  <UserPlus className="h-4 w-4" /> Add your first contact
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                <AnimatePresence>
                  {contacts.map((c, i) => (
                    <motion.div
                      key={c.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: i * 0.05 }}
                      className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all duration-200 group ${
                        c.isPrimary
                          ? "border-[var(--primary)]/40 bg-[var(--primary-glow)]"
                          : "border-[var(--border)] bg-[var(--secondary)] hover:border-[var(--primary)]/30"
                      }`}
                    >
                      <Avatar className={`h-11 w-11 bg-gradient-to-br ${avatarColors[i % avatarColors.length]} flex-shrink-0`}>
                        <AvatarFallback className={`bg-gradient-to-br ${avatarColors[i % avatarColors.length]} text-white font-bold`}>
                          {c.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <p className="font-semibold text-sm truncate">{c.name}</p>
                          {c.isPrimary && <Badge variant="info" className="text-[10px] px-1.5 py-0">Primary</Badge>}
                          <span className="text-xs text-muted-foreground">{c.relationship}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Phone className="h-3 w-3" />{c.phone}
                          </span>
                          <span className="text-xs text-muted-foreground flex items-center gap-1 hidden sm:flex">
                            <Mail className="h-3 w-3" />{c.email}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {!c.isPrimary && (
                          <button onClick={() => setPrimary(c.id)} className="icon-btn" title="Set as primary">
                            <Star className="h-3.5 w-3.5" />
                          </button>
                        )}
                        <button onClick={() => openEdit(c)} className="icon-btn" title="Edit">
                          <Edit className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteId(c.id)}
                          className="icon-btn hover:bg-[var(--destructive-muted)] hover:text-[var(--destructive)] hover:border-[var(--destructive)]/30"
                          title="Delete"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {contacts.length < 5 && (
                  <button
                    onClick={openAdd}
                    className="w-full flex items-center justify-center gap-2 p-3 rounded-xl border-2 border-dashed border-[var(--border)] text-sm text-muted-foreground hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all duration-200 mt-1"
                  >
                    <UserPlus className="h-4 w-4" />
                    Add another contact ({contacts.length}/5)
                  </button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* SOS Info */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <div className="p-4 rounded-xl border border-[var(--warning)]/30 bg-[var(--warning-muted)] flex items-start gap-3">
          <AlertTriangle className="h-4 w-4 text-[var(--warning)] mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-[var(--warning)]">How SOS Alerts Work</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              When an accident is detected, all contacts are alerted via SMS and push notification with your live GPS location. Primary contact is called first.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Add / Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-[var(--card)] border-[var(--border)] max-w-md">
          <DialogHeader>
            <DialogTitle>{editContact ? "Edit Contact" : "Add Emergency Contact"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-2">
            {[
              { id: "name",         label: "Full Name",    placeholder: "Priya Sharma",        type: "text"  },
              { id: "phone",        label: "Phone",         placeholder: "+91 98765 43210",     type: "tel"   },
              { id: "email",        label: "Email",         placeholder: "contact@example.com", type: "email" },
              { id: "relationship", label: "Relationship",  placeholder: "Spouse, Parent…",     type: "text"  },
            ].map(({ id, label, placeholder, type }) => (
              <div key={id} className="space-y-1.5">
                <Label htmlFor={id} className="text-sm">{label}</Label>
                <Input
                  id={id} type={type} placeholder={placeholder}
                  value={(form as any)[id]}
                  onChange={e => setForm({ ...form, [id]: e.target.value })}
                />
              </div>
            ))}
            <label className="flex items-center gap-2.5 p-3 rounded-lg bg-[var(--secondary)] cursor-pointer hover:bg-[var(--muted)] transition-colors">
              <input
                type="checkbox" checked={form.isPrimary}
                onChange={e => setForm({ ...form, isPrimary: e.target.checked })}
                className="w-4 h-4 rounded accent-[var(--primary)]"
              />
              <div>
                <p className="text-sm font-medium">Set as primary contact</p>
                <p className="text-xs text-muted-foreground">This person is called first in an emergency</p>
              </div>
            </label>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button variant="gradient" onClick={handleSave}>{editContact ? "Save Changes" : "Add Contact"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirm */}
      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent className="bg-[var(--card)] border-[var(--border)] max-w-sm">
          <DialogHeader>
            <DialogTitle>Remove Contact?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground py-2">This contact will no longer receive SOS alerts. This cannot be undone.</p>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setDeleteId(null)}>Cancel</Button>
            <Button variant="gradient-warm" onClick={() => deleteId && handleDelete(deleteId)} className="gap-2">
              <Trash2 className="h-4 w-4" /> Remove
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}