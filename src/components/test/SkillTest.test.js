import emailjs from 'emailjs-com';
import { addSkill } from '../../views/User/SkillAssessment.vue';

// Mock emailjs.send
jest.mock('emailjs-com', () => ({
  send: jest.fn(),
}));

describe('addSkill function', () => {
  beforeEach(() => {
    emailjs.send.mockClear();
  });

  it('should send an email with the correct parameters when the skill is valid', async () => {
    // Mock data inputs for fields
    const skillDescription = { value: 'Skill One' };
    const currentStageId = { value: '1' };
    const skillGapDetails = { value: 'Some gap details' };
    const desiredStageId = { value: '2' };
    const actionPlan = { value: 'Some action plan' };
    const comment = { value: 'Some comment' };
    const createdBy = { value: 'Test User' };
    const lastModifiedBy = { value: 'Test User' };
    const recordOwner = { value: 'Owner' };

    // Assuming your store's `addSkill` method is mocked as well
    const store = { addSkill: jest.fn() };
    
    await addSkill();

    // Check if emailjs.send was called
    expect(emailjs.send).toHaveBeenCalledWith(
      'service_m2mjawc',
      'template_1d0qqkb',
      {
        to_name: 'Test User',
        skill_description: 'Skill One',
        current_stage: '1',
        desired_stage: '2',
        action_plan: 'Some action plan',
      },
      'WxvKMfIDsiWn1QUgM'
    );
  });

  it('should not send an email if validation fails', async () => {
    // Set up invalid data
    const skillDescription = { value: '' }; // Invalid field

    await addSkill();

    // Check that emailjs.send is not called
    expect(emailjs.send).not.toHaveBeenCalled();
  });
});
