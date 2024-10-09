import CustomAccordion from "@/components/CustomAccordion"
import BackgroundBlur from "../background/options/BackgroundBlur"
import BackgroundNoise from "../background/options/BackgroundNoise"

const BackgroundEffects = () => {
  return (
    <CustomAccordion type="multiple">
      <BackgroundBlur />
      <BackgroundNoise />
    </CustomAccordion>
  )
}

export default BackgroundEffects