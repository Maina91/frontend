import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Input } from '@/components/ui/input'
// import { Upload } from '@/components/ui/upload'
import { Plus } from 'lucide-react'
import { useCustomerProfile } from '@/core/hooks/customer/use-profile'
import { useBank } from '@/core/hooks/customer/use-bank'
import { useKin } from '@/core/hooks/customer/use-kin'
import { useBeneficiary } from '@/core/hooks/customer/use-beneficiaries'


export const ProfilePage = () => {
  const { data: profile, isLoading, error } = useCustomerProfile()
  const { data: bankDetails, isLoading: bankLoading, error: bankError } = useBank()
  const { data: kinDetails, isLoading: kinLoading, error: kinError } = useKin()
  const { data: beneficiaryDetails, isLoading: beneficiaryLoading, error: beneficiaryError } = useBeneficiary()

  console.log('ProfilePage profile', profile)
  console.log('ProfilePage bankDetails', bankDetails)
  console.log('ProfilePage kinDetails', kinDetails)
  console.log('ProfilePage beneficiaries', beneficiaryDetails)

  const [kycDocuments, setKycDocuments] = useState([
    { name: 'ID or Passport', description: 'ID or Passport', number: '', actions: '' },
    { name: 'Tax/KRA PIN', description: 'Tax Identification (KRA PIN for Kenyans)', number: '', actions: '' },
    { name: 'Color passport sized photos', description: 'Passport sized photos (in color)', number: '', actions: '' },
  ])

  return (
    <div className="space-y-8">
      {/* PROFILE SUMMARY */}
      <section className="bg-white shadow rounded-md p-6">
        {isLoading ? (
          <div className="space-y-2 animate-pulse">
            <div className="h-6 w-48 bg-gray-200 rounded" />
            <div className="h-4 w-32 bg-gray-200 rounded" />
          </div>
        ) : !profile ? (
          <div className="text-gray-500 text-sm">
            No profile data available.
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-semibold text-gray-900">
              {profile.full_name || '—'}
            </h1>
            <p className="text-gray-600">
              Member No: {profile.member_no || '—'}
            </p>
          </>
        )}
      </section>

      {/* BANK / MOBILE MONEY ACCOUNTS */}
      <section className="bg-white shadow rounded-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Bank Accounts</h2>
          <Button variant="outline" size="sm">
            <Plus className="w-4 h-4 mr-1" /> Add Bank Account
          </Button>
        </div>

        {bankLoading ? (
          <div className="space-y-2 animate-pulse">
            <div className="h-5 w-48 bg-gray-200 rounded" />
            <div className="h-4 w-64 bg-gray-200 rounded" />
          </div>
        ) : bankError ? (
          <p className="text-red-600 text-sm">Failed to load bank details.</p>
        ) : !bankDetails?.banks?.length && !bankDetails?.mobile_payments_no ? (
          <p className="text-gray-500 text-sm">No bank or mobile money accounts found.</p>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Account Name</TableHead>
                  <TableHead>Account Number</TableHead>
                  <TableHead>Bank</TableHead>
                  <TableHead>Branch</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bankDetails?.banks?.map((acc) => (
                  <TableRow key={acc.id}>
                    <TableCell>{acc.account_name}</TableCell>
                    <TableCell>{acc.account_no}</TableCell>
                    <TableCell>{acc.name}</TableCell>
                    <TableCell>{acc.branch_name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {bankDetails?.mobile_payments_no && (
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-700">Mobile Payment Number</h3>
                <p className="text-gray-900">{bankDetails.mobile_payments_no}</p>
              </div>
            )}
          </>
        )}
      </section>

      {/* NEXT OF KIN */}
      <section className="bg-white shadow rounded-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Next of Kin</h2>
          <Button variant="outline" size="sm">
            <Plus className="w-4 h-4 mr-1" /> Add Next of Kin
          </Button>
        </div>

        {kinLoading && (
          <div className="space-y-2 animate-pulse">
            <div className="h-4 w-40 bg-gray-200 rounded" />
            <div className="h-4 w-56 bg-gray-200 rounded" />
          </div>
        )}

        {kinError && (
          <p className="text-red-500 text-sm">
            {(kinError as Error)?.message || 'Failed to load next of kin.'}
          </p>
        )}

        {!kinLoading && !kinError && kinDetails && kinDetails.next_of_kin.length === 0 && (
          <p className="text-gray-500 text-sm">No next of kin added yet.</p>
        )}

        {!kinLoading && !kinError && kinDetails && kinDetails.next_of_kin.length > 0 && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Relationship</TableHead>
                <TableHead>ID/Passport Number</TableHead>
                <TableHead>Mobile</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {kinDetails.next_of_kin.map((kin) => (
                <TableRow key={kin.id}>
                  <TableCell>{kin.full_name}</TableCell>
                  <TableCell>{kin.relationship}</TableCell>
                  <TableCell>{kin.id_passport_number ?? '-'}</TableCell>
                  <TableCell>{kin.mobile ?? '-'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </section>

      {/* BENEFICIARIES */}
      <section className="bg-white shadow rounded-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Beneficiaries</h2>
          <Button variant="outline" size="sm">
            <Plus className="w-4 h-4 mr-1" /> Add Beneficiary
          </Button>
        </div>

        {beneficiaryLoading && (
          <div className="space-y-2 animate-pulse">
            <div className="h-4 w-40 bg-gray-200 rounded" />
            <div className="h-4 w-56 bg-gray-200 rounded" />
          </div>
        )}

        {beneficiaryError && (
          <p className="text-red-500 text-sm">
            {(beneficiaryError as Error)?.message || 'Failed to load beneficiaries.'}
          </p>
        )}

        {!beneficiaryLoading && !beneficiaryError && beneficiaryDetails && beneficiaryDetails.beneficiaries.length === 0 && (
          <p className="text-gray-500 text-sm">No beneficiaries added yet.</p>
        )}

        {!beneficiaryLoading && !beneficiaryError && beneficiaryDetails && beneficiaryDetails.beneficiaries.length > 0 && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Relationship</TableHead>
                <TableHead>ID/Passport Number</TableHead>
                <TableHead>Percentage</TableHead>
                <TableHead>Mobile</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {beneficiaryDetails.beneficiaries.map((ben) => (
                <TableRow key={ben.id}>
                  <TableCell>{ben.full_name}</TableCell>
                  <TableCell>{ben.relationship}</TableCell>
                  <TableCell>{ben.id_passport_number ?? '-'}</TableCell>
                  <TableCell>{ben.percentage_share ?? '-'}</TableCell>
                  <TableCell>{ben.mobile ?? '-'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </section>

      {/* KYC DOCUMENTS */}
      <section className="bg-white shadow rounded-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">KYC Documents</h2>
          {/* <Upload> */}
            <Button variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-1" /> Upload KYC Document
            </Button>
          {/* </Upload> */}
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Number</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {kycDocuments.map((doc, idx) => (
              <TableRow key={idx}>
                <TableCell>{doc.name}</TableCell>
                <TableCell>{doc.description}</TableCell>
                <TableCell>{doc.number}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">
                    Download
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </div>
  )
}
