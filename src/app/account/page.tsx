import UpdateUserDetails from '@/app/account/UpdateUserDetails';
import SignOut from '@/components/SignOut';
import { Box, Container, Title } from '@/components/DesignSystemElements';

export default function Account() {
  return (
    <Container>
      <Title className="mb-6">ACCOUNT</Title>
      <Box className="grid gap-4 md:inline-grid md:w-full md:max-w-2xl mb-6">
        <p>Click the field to update/change the value</p>
        <UpdateUserDetails />
      </Box>
      <SignOut />
    </Container>
  );
}
