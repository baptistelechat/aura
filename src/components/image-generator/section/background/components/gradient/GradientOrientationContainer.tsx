import { Label } from '@/components/ui/label'
import GradientOrientationPicker from './GradientOrientationPicker'

const GradientOrientationContainer = () => {
  return (
     <div className="flex justify-between">
        <div className="flex flex-col gap-4">
          <Label>Linear</Label>
          <GradientOrientationPicker variant={"linear"} />
        </div>
        <div className="flex flex-col gap-4">
          <Label>Radial</Label>
          <GradientOrientationPicker variant={"radial"} />
        </div>
      </div>
  )
}

export default GradientOrientationContainer