import styled from "styled-components";

const Wraper = styled.div``;

const Header = styled.div``;

const Onboarding = () => {
  return (
    <Wraper>
      <Header>
        <h2>Complete Your Profile</h2>
        <p>Help other creators discover and connect with you.</p>
      </Header>

      <form>
        <div className="label-input-container">
          <label htmlFor="name">What should we call you ?</label>
          <input type="text" placeholder="enter your name" />
        </div>

        <div className="label-input-container">
          <label htmlFor="username">Choose your unique username</label>
          <input type="text" placeholder="enter your username" />
        </div>
      </form>
    </Wraper>
  );
};
