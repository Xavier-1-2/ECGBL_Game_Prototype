using UnityEngine;

public class Bs : MonoBehaviour
{
    [SerializeField] private AudioSource audioSource;

    void Update()
    {
        if (Input.GetKeyDown(KeyCode.X))
        {
            audioSource.Play();
        }
    }
}
