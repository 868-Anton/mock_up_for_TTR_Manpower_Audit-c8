"use client"

import type React from "react"

import { useState } from "react"
import { ChevronDown, ChevronLeft, ChevronRight, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CollapsibleSectionProps {
  title: string
  isOpen: boolean
  onToggle: () => void
  children?: React.ReactNode
}

function CollapsibleSection({ title, isOpen, onToggle, children }: CollapsibleSectionProps) {
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full py-4 text-left hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
          <span className="font-medium text-lg">{title}</span>
        </div>
      </button>
      {isOpen && <div className="pb-4 px-6">{children}</div>}
    </div>
  )
}

export default function TTRAuditInterface() {
  const [currentRecord, setCurrentRecord] = useState(1)
  const totalRecords = 2240

  const [sections, setSections] = useState({
    coreFields: true,
    address: false,
    emergencyContact: false,
    adminUpdate: false,
    demographicData: false,
    movement: false,
  })

  const toggleSection = (section: keyof typeof sections) => {
    setSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const navigateRecord = (direction: "prev" | "next") => {
    if (direction === "prev" && currentRecord > 1) {
      setCurrentRecord((prev) => prev - 1)
    } else if (direction === "next" && currentRecord < totalRecords) {
      setCurrentRecord((prev) => prev + 1)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex-1"></div>
          <h1 className="text-3xl font-bold text-center">TTR Manpower Audit 2025</h1>
          <div className="flex-1 text-right">
            <span className="text-lg font-medium">
              Record {currentRecord.toString().padStart(2, "0")} of {totalRecords}
            </span>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex items-center gap-8 mb-8">
          {/* Left Navigation Arrow */}
          <Button
            variant="ghost"
            size="lg"
            onClick={() => navigateRecord("prev")}
            disabled={currentRecord === 1}
            className="h-16 w-16 rounded-full"
          >
            <ChevronLeft className="w-8 h-8" />
          </Button>

          {/* Profile Section */}
          <div className="flex items-center gap-8 flex-1">
            {/* Profile Image */}
            <div className="w-48 h-48 bg-gray-300 rounded-lg flex items-center justify-center">
              <User className="w-24 h-24 text-gray-500" />
            </div>

            {/* Basic Info Fields */}
            <div className="grid grid-cols-1 gap-4 flex-1">
              <div>
                <Label htmlFor="number" className="text-lg font-medium">
                  Number
                </Label>
                <Input id="number" placeholder="Enter number" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="rank" className="text-lg font-medium">
                  Rank
                </Label>
                <Input id="rank" placeholder="Enter rank" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="firstName" className="text-lg font-medium">
                  First Name
                </Label>
                <Input id="firstName" placeholder="Enter first name" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="lastName" className="text-lg font-medium">
                  Last Name
                </Label>
                <Input id="lastName" placeholder="Enter last name" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="gender" className="text-lg font-medium">
                  Gender
                </Label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Right Navigation Arrow */}
          <Button
            variant="ghost"
            size="lg"
            onClick={() => navigateRecord("next")}
            disabled={currentRecord === totalRecords}
            className="h-16 w-16 rounded-full"
          >
            <ChevronRight className="w-8 h-8" />
          </Button>
        </div>

        {/* Collapsible Sections */}
        <Card className="w-full">
          <CardContent className="p-0">
            {/* Core Audit Fields */}
            <CollapsibleSection
              title="Core Audit Fields"
              isOpen={sections.coreFields}
              onToggle={() => toggleSection("coreFields")}
            >
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <Label htmlFor="battalion" className="text-base font-medium">
                    Battalion
                  </Label>
                  <Input id="battalion" placeholder="Enter battalion" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="platoon" className="text-base font-medium">
                    Platoon
                  </Label>
                  <Input id="platoon" placeholder="Enter platoon" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="portfolio" className="text-base font-medium">
                    Portfolio
                  </Label>
                  <Input id="portfolio" placeholder="Enter portfolio" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="company" className="text-base font-medium">
                    Company
                  </Label>
                  <Input id="company" placeholder="Enter company" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="department" className="text-base font-medium">
                    Department
                  </Label>
                  <Input id="department" placeholder="Enter department" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="employmentStatus" className="text-base font-medium">
                    Employment Status
                  </Label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="retired">Retired</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CollapsibleSection>

            {/* Address */}
            <CollapsibleSection title="Address" isOpen={sections.address} onToggle={() => toggleSection("address")}>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="street" className="text-base font-medium">
                    Street Address
                  </Label>
                  <Input id="street" placeholder="Enter street address" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="city" className="text-base font-medium">
                    City
                  </Label>
                  <Input id="city" placeholder="Enter city" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="state" className="text-base font-medium">
                    State/Province
                  </Label>
                  <Input id="state" placeholder="Enter state/province" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="postal" className="text-base font-medium">
                    Postal Code
                  </Label>
                  <Input id="postal" placeholder="Enter postal code" className="mt-1" />
                </div>
              </div>
            </CollapsibleSection>

            {/* Emergency Contact */}
            <CollapsibleSection
              title="Emergency Contact"
              isOpen={sections.emergencyContact}
              onToggle={() => toggleSection("emergencyContact")}
            >
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="emergencyName" className="text-base font-medium">
                    Contact Name
                  </Label>
                  <Input id="emergencyName" placeholder="Enter contact name" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="emergencyPhone" className="text-base font-medium">
                    Phone Number
                  </Label>
                  <Input id="emergencyPhone" placeholder="Enter phone number" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="relationship" className="text-base font-medium">
                    Relationship
                  </Label>
                  <Input id="relationship" placeholder="Enter relationship" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="emergencyEmail" className="text-base font-medium">
                    Email
                  </Label>
                  <Input id="emergencyEmail" placeholder="Enter email" className="mt-1" />
                </div>
              </div>
            </CollapsibleSection>

            {/* Admin to Update */}
            <CollapsibleSection
              title="Admin to Update"
              isOpen={sections.adminUpdate}
              onToggle={() => toggleSection("adminUpdate")}
            >
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="lastUpdated" className="text-base font-medium">
                    Last Updated
                  </Label>
                  <Input id="lastUpdated" type="date" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="updatedBy" className="text-base font-medium">
                    Updated By
                  </Label>
                  <Input id="updatedBy" placeholder="Enter admin name" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="notes" className="text-base font-medium">
                    Notes
                  </Label>
                  <Input id="notes" placeholder="Enter notes" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="status" className="text-base font-medium">
                    Review Status
                  </Label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="reviewed">Reviewed</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CollapsibleSection>

            {/* Demographic Data */}
            <CollapsibleSection
              title="Demographic Data"
              isOpen={sections.demographicData}
              onToggle={() => toggleSection("demographicData")}
            >
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <Label htmlFor="dateOfBirth" className="text-base font-medium">
                    Date of Birth
                  </Label>
                  <Input id="dateOfBirth" type="date" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="nationality" className="text-base font-medium">
                    Nationality
                  </Label>
                  <Input id="nationality" placeholder="Enter nationality" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="maritalStatus" className="text-base font-medium">
                    Marital Status
                  </Label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Single</SelectItem>
                      <SelectItem value="married">Married</SelectItem>
                      <SelectItem value="divorced">Divorced</SelectItem>
                      <SelectItem value="widowed">Widowed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CollapsibleSection>

            {/* Movement */}
            <CollapsibleSection title="Movement" isOpen={sections.movement} onToggle={() => toggleSection("movement")}>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="currentLocation" className="text-base font-medium">
                    Current Location
                  </Label>
                  <Input id="currentLocation" placeholder="Enter current location" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="previousLocation" className="text-base font-medium">
                    Previous Location
                  </Label>
                  <Input id="previousLocation" placeholder="Enter previous location" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="transferDate" className="text-base font-medium">
                    Transfer Date
                  </Label>
                  <Input id="transferDate" type="date" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="reason" className="text-base font-medium">
                    Reason for Transfer
                  </Label>
                  <Input id="reason" placeholder="Enter reason" className="mt-1" />
                </div>
              </div>
            </CollapsibleSection>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <Button variant="outline" size="lg">
            Save Draft
          </Button>
          <Button size="lg">Save & Next</Button>
        </div>
      </div>
    </div>
  )
}
