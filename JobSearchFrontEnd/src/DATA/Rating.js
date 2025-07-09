import { Box, Button, RatingGroup } from "@chakra-ui/react"

const Demo = () => {
  return (
    <RatingGroup.Root count={5} defaultValue={3} size="sm">
      <RatingGroup.HiddenInput />
      <RatingGroup.Control />
      <Button type="submit">Submit</Button>
      <Box background="tomato" width="100%" padding="4" color="white">
      This is the Box
    </Box>
    </RatingGroup.Root>
  )
}

export default Demo;