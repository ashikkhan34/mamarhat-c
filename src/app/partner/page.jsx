import React from 'react'
import PartnerHero from '../PartnerComponents/PartnerHero/PartnerHero'
import PartnerAbout from '../PartnerComponents/ParnterAbout/PartnerAbout'
import PartnerForm from '../PartnerComponents/PartnerFrom/PartnerFrom'

export default function Partner() {
  return (
    <div className=''>
        <PartnerHero></PartnerHero>
        <PartnerAbout></PartnerAbout>
        <PartnerForm></PartnerForm>
    </div>
  )
}
